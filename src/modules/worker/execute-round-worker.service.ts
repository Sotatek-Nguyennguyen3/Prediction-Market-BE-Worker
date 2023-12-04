import { getLogger } from "../../shared/logger";
import * as ethereumjs from "@ethereumjs/tx";
import Common from "@ethereumjs/common";
import { getConnection, LessThanOrEqual, Repository } from "typeorm";
import {
  BetOnchain,
  Config,
  CurrencyConfig,
  LatestBlock,
  RoundOnchain,
  TransactionLog,
} from "../../database/entities";
import { NotificationService } from "../notification/notification.service";
import { KmsService } from "../common/kms.service";
import { SocketService } from "./socket.service";
import BigNumber from "bignumber.js";
import {
  OnchainRoundStatus,
  OnchainStatus,
  SocketEvents,
  TransactionOnchainType,
} from "../../shared/enums";
import { AddressesService } from "../addresses/addresses.service";
import { getBlockNumber } from "../../shared/Utils";
import axios from "axios";
import pLimit from "p-limit";
const ABI = require("../../../smart-contract/PredictionMarket.json")


const NodeCache = require("node-cache");
const BATCH_LIMIT = 20;
const nodeCache = new NodeCache({
  stdTTL: BATCH_LIMIT,
  checkperiod: BATCH_LIMIT,
});
const limit = pLimit(BATCH_LIMIT);
const EthereumTx = ethereumjs.Transaction;
const Web3 = require("web3");
const fs = require("fs");
const logger = getLogger("ExecuteRoundWorkerService");
const RETRY_INTERVAL = 1 * 60 * 1000; // 1 minutes
const decimalsNumber = 18;
const decimalsBigNumber = new BigNumber(1000000000000000000);
const decimalsString = "000000000000000";
const MAX_BLOCK_PER_TIME = 999; //999
const PREFIX_KEY = "crawl_execute_round_";
const PREFIX_KEY_TEMP = "crawl_execute_round_temp_";
import { Provider } from "zksync-web3";
export class ExecuteRoundWorkerService {
  _web3 = new Web3(this.currency.rpcEndpoint);
  provider = new Provider("​https://api.avax-test.network/ext/bc/C/rpc");
  _common = Common.custom({ chainId: Number(this.currency.chainId) });

  _excuteRoundAbi = fs.readFileSync(
    "./PredictionMarket.json",
    "utf8"
  );
  
  _executeRoundContract = new this._web3.eth.Contract(
    JSON.parse(ABI),
    JSON.parse(this.currency.tokenAddresses)?.["predictionMarket"]
  );

  _addminAddress = null;
  constructor(
    private readonly kmsService: KmsService,
    private readonly notificationService: NotificationService,
    private readonly socketService: SocketService,
    private readonly addressesService: AddressesService,
    private latestBlockRepository: Repository<LatestBlock>,
    private currency: CurrencyConfig,
    private roundOnchainRepository: Repository<RoundOnchain>,
    private betOnchainRepository: Repository<BetOnchain>,
    private configRepository: Repository<Config>
  ) {
    this._setup();
  }

  async _setup() {
    console.log("zzz1");

    this._addminAddress = await this.addressesService.getAddress(this.currency);
    console.log("zzz1");

    if (!this._addminAddress) {
      logger.error(
        `${this.currency.network} ExecuteRoundWorkerService::doCrawlJob No address found`
      );
      return;
    }
    this.doCrawJob();
    this.doJob();
  }

  async doCrawJob() {
    do {
      try {
        console.log("zzz3");

        let isWaiting = await this.crawlData();
        if (isWaiting) {
          await this.delay(this.currency.averageBlockTime);
        } else {
          await this.delay(5000); // 5 seconds, to avoid too many requests
        }
      } catch (e) {
        console.log(e);
        if (
          e.message.indexOf("ER_LOCK_WAIT_TIMEOUT") > -1 ||
          e.message.indexOf("ER_LOCK_DEADLOCK") > -1
        ) {
          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::doCrawlJob Other server is doing the job, wait for a while`
          );
        } else {
          logger.error(
            `${this.currency.network} ExecuteRoundWorkerService::doCrawlJob ${e}`
          );
          this.notificationService.notificationException(
            `${this.currency.network} ExecuteRoundWorkerService::doCrawlJob err=${e.message}`
          );
        }
      }
    } while (true);
  }

  async doJob() {
    do {
      try {
        //temporary time delay 5 seconds every new round
        await this.genesisStartRound();
        await this.delay(5 * 60 * 1000);
        await this.genesisLockRound();
        do {
          try {
            await this.delay(5 * 60 * 1000);
            await this.executeRound();
          } catch (e) {
            logger.error(
              `${this.currency.network} ExecuteRoundWorkerService::doJob error=${e.message}`
            );
            //call pause until success, call unpause until success
            do {
              try {
                await this.pause();
              } catch (e) {
                logger.error(
                  `${this.currency.network} ExecuteRoundWorkerService::doJob error=${e.message}`
                );
                break;
              }
            } while (true);
            await this.delay(15 * 1000);
            do {
              try {
                await this.unPause();
              } catch (e) {
                logger.error(
                  `${this.currency.network} ExecuteRoundWorkerService::doJob error=${e.message}`
                );
                break;
              }
            } while (true);
            break;
          }
        } while (true);
      } catch (e) {
        console.log(e);
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::doJob error=${e.message}`
        );
        //call pause until success, call unpause until success
        do {
          try {
            await this.pause();
          } catch (e) {
            logger.error(
              `${this.currency.network} ExecuteRoundWorkerService::doJob error=${e.message}`
            );
            break;
          }
        } while (true);
        await this.delay(15 * 1000);
        do {
          try {
            await this.unPause();
          } catch (e) {
            logger.error(
              `${this.currency.network} ExecuteRoundWorkerService::doJob error=${e.message}`
            );
            break;
          }
        } while (true);
      }
    } while (true);
  }

  //start genesis round
  //TODO: move handle transaction part to a separate function
  async genesisStartRound() {
    try {
      if (!this._executeRoundContract._address) {
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::checkBalance No address found`
        );
        return;
      }

      // construct the transaction data
      const fromAddress = this._addminAddress.address;
      const nonce = await this._web3.eth.getTransactionCount(fromAddress);
      const _gasPrice = await this.getGasPrice();

      const gasPrice = this._web3.utils.toBN(_gasPrice);
      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::genesisStartRound gasPrice=${gasPrice}`
      );

      const startTime = Math.round(Date.now() / 1000);
      let _gasLimit = await this._executeRoundContract.methods
        .genesisStartRound(startTime)
        .estimateGas({ from: fromAddress });

      if (_gasLimit < 150000) {
        _gasLimit = 150000;
      }

      /**
       * Reference from Bridge:
       * Fix maximum gas limit is 300,000 to prevent draining attack
       */
      // if (_gasLimit > 300000) {
      //     _gasLimit = 300000;
      // }

      const gasLimit = this._web3.utils.toBN(_gasLimit);
      const fee = gasPrice.mul(gasLimit);

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::genesisStartRound fee=${fee}, gasLimit=${gasLimit}`
      );
      /**
       * Reference from Bridge:
       * Check whether the balance of hot wallet is enough to send
       */
      const ethBalance = this._web3.utils.toBN(
        (await this._web3.eth.getBalance(fromAddress)).toString()
      );

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::genesisStartRound ethBalance=${ethBalance}`
      );

      if (ethBalance.lt(fee)) {
        throw new Error(
          `${this.currency.network} ExecuteRoundWorkerService::constructRawTransaction Could not construct tx because of lacking fee: address=${fromAddress}, fee=${fee}, ethBalance=${ethBalance}`
        );
      }

      const txParams = {
        data: this._executeRoundContract.methods
          .genesisStartRound(startTime)
          .encodeABI(),
        gasLimit: this._web3.utils.toHex(gasLimit),
        gasPrice: this._web3.utils.toHex(gasPrice),
        nonce: this._web3.utils.toHex(nonce),
        to: this._executeRoundContract._address,
        value: this._web3.utils.toHex(0),
      };

      const tx = new EthereumTx(txParams, { common: this._common });
      const unsignedRaw = tx.serialize().toString("hex");

      // sign the transaction
      const private_key = JSON.parse(this._addminAddress.secret).private_key;
      const kms_data_key_id = JSON.parse(
        this._addminAddress.secret
      ).kms_data_key_id;
      let secret = await this.kmsService.decrypt(private_key, kms_data_key_id);

      if (secret.startsWith("0x")) {
        secret = secret.substr(2);
      }

      const ethTx = EthereumTx.fromSerializedTx(
        Buffer.from(unsignedRaw, "hex"),
        { common: this._common }
      );
      const privateKey = Buffer.from(secret, "hex");
      const signedTx = ethTx.sign(privateKey);

      const txid = `0x${signedTx.hash().toString("hex")}`;
      const signedRaw = `0x${signedTx.serialize().toString("hex")}`;

      // send the transaction
      const receipt = await this.provider.sendTransaction(signedRaw);
      logger.info(
        `${
          this.currency.network
        } ExecuteRoundWorkerService::genesisStartRound txid=${txid}, receipt=${JSON.stringify(
          receipt
        )}`
      );

      // delay 12 seconds (buffer time)
      await this.delay(12 * 1000);
    } catch (e) {
      logger.error(
        `${this.currency.network} ExecuteRoundWorkerService::genesisStartRound error=${e.message}`
      );
      throw e;
    }
  }

  //lock genesis round
  //TODO: move handle transaction part to a separate function
  async genesisLockRound() {
    try {
      if (!this._executeRoundContract._address) {
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::genesisLockRound No address found`
        );
        return;
      }

      //get current price
      //TODO: move to a separate function
      const queryResult: any = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=F4ZBZI5ZVN2HZE3UTW1A6UZCAIZ6P4NYD9`
      );
      if (!queryResult || !queryResult?.data?.result?.ethusd) {
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::genesisLockRound No price found`
        );
        return;
      }
      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::genesisLockRound queryResult=${queryResult}`
      );
      const currentPrice =
        (queryResult.data.result.ethusd * 1000).toString() + decimalsString;
      // construct the transaction data
      const fromAddress = this._addminAddress.address;
      const nonce = await this._web3.eth.getTransactionCount(fromAddress);
      const _gasPrice = await this.getGasPrice();

      const gasPrice = this._web3.utils.toBN(_gasPrice);
      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::genesisLockRound gasPrice=${gasPrice}`
      );

      const lockTime = Math.round(Date.now() / 1000);
      let _gasLimit = await this._executeRoundContract.methods
        .genesisLockRound(this._web3.utils.toBN(currentPrice), lockTime)
        .estimateGas({ from: fromAddress });

      if (_gasLimit < 150000) {
        _gasLimit = 150000;
      }

      const gasLimit = this._web3.utils.toBN(_gasLimit);
      const fee = gasPrice.mul(gasLimit);

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::genesisLockRound fee=${fee}, gasLimit=${gasLimit}`
      );
      /**
       * Reference from Bridge:
       * Check whether the balance of hot wallet is enough to send
       */
      const ethBalance = this._web3.utils.toBN(
        (await this._web3.eth.getBalance(fromAddress)).toString()
      );

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::genesisLockRound ethBalance=${ethBalance}`
      );

      if (ethBalance.lt(fee)) {
        throw new Error(
          `${this.currency.network} ExecuteRoundWorkerService::genesisLockRound Could not construct tx because of lacking fee: address=${fromAddress}, fee=${fee}, ethBalance=${ethBalance}`
        );
      }

      const txParams = {
        data: this._executeRoundContract.methods
          .genesisLockRound(currentPrice, lockTime)
          .encodeABI(),
        gasLimit: this._web3.utils.toHex(gasLimit),
        gasPrice: this._web3.utils.toHex(gasPrice),
        nonce: this._web3.utils.toHex(nonce),
        to: this._executeRoundContract._address,
        value: this._web3.utils.toHex(0),
      };

      const tx = new EthereumTx(txParams, { common: this._common });
      const unsignedRaw = tx.serialize().toString("hex");

      // sign the transaction
      const private_key = JSON.parse(this._addminAddress.secret).private_key;
      const kms_data_key_id = JSON.parse(
        this._addminAddress.secret
      ).kms_data_key_id;
      let secret = await this.kmsService.decrypt(private_key, kms_data_key_id);

      if (secret.startsWith("0x")) {
        secret = secret.substr(2);
      }

      const ethTx = EthereumTx.fromSerializedTx(
        Buffer.from(unsignedRaw, "hex"),
        { common: this._common }
      );
      const privateKey = Buffer.from(secret, "hex");
      const signedTx = ethTx.sign(privateKey);

      const txid = `0x${signedTx.hash().toString("hex")}`;
      const signedRaw = `0x${signedTx.serialize().toString("hex")}`;

      // send the transaction
      const receipt = await this.provider.sendTransaction(signedRaw);
      logger.info(
        `${
          this.currency.network
        } ExecuteRoundWorkerService::genesisLockRound txid=${txid}, receipt=${JSON.stringify(
          receipt
        )}`
      );

      // delay 5 seconds (interval time)
      await this.delay(12 * 1000);
    } catch (e) {
      throw e;
    }
  }

  //excute round with current price
  //TODO: move handle transaction part to a separate function
  async executeRound() {
    try {
      if (!this._executeRoundContract._address) {
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::executeRound No address found`
        );
        return;
      }

      //get current price
      //TODO: move to a separate function
      const queryResult: any = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=F4ZBZI5ZVN2HZE3UTW1A6UZCAIZ6P4NYD9`
      );
      if (!queryResult || !queryResult?.data?.result?.ethusd) {
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::executeRound No price found`
        );
        return;
      }
      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::executeRound queryResult=${queryResult}`
      );
      const currentPrice =
        (queryResult.data.result.ethusd * 1000).toString() + decimalsString;

      // construct the transaction data
      const fromAddress = this._addminAddress.address;
      const nonce = await this._web3.eth.getTransactionCount(fromAddress);
      const _gasPrice = await this.getGasPrice();

      const gasPrice = this._web3.utils.toBN(_gasPrice);
      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::executeRound gasPrice=${gasPrice}`
      );

      const executeTime = Math.round(Date.now() / 1000);
      let _gasLimit = await this._executeRoundContract.methods
        .executeRound(this._web3.utils.toBN(currentPrice), executeTime)
        .estimateGas({ from: fromAddress });

      if (_gasLimit < 150000) {
        _gasLimit = 150000;
      }

      const gasLimit = this._web3.utils.toBN(_gasLimit);
      const fee = gasPrice.mul(gasLimit);

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::executeRound fee=${fee}, gasLimit=${gasLimit}`
      );
      /**
       * Reference from Bridge:
       * Check whether the balance of hot wallet is enough to send
       */
      const ethBalance = this._web3.utils.toBN(
        (await this._web3.eth.getBalance(fromAddress)).toString()
      );

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::executeRound ethBalance=${ethBalance}`
      );

      if (ethBalance.lt(fee)) {
        throw new Error(
          `${this.currency.network} ExecuteRoundWorkerService::executeRound Could not construct tx because of lacking fee: address=${fromAddress}, fee=${fee}, ethBalance=${ethBalance}`
        );
      }

      const txParams = {
        data: this._executeRoundContract.methods
          .executeRound(currentPrice, executeTime)
          .encodeABI(),
        gasLimit: this._web3.utils.toHex(gasLimit),
        gasPrice: this._web3.utils.toHex(gasPrice),
        nonce: this._web3.utils.toHex(nonce),
        to: this._executeRoundContract._address,
        value: this._web3.utils.toHex(0),
      };

      const tx = new EthereumTx(txParams, { common: this._common });
      const unsignedRaw = tx.serialize().toString("hex");

      // sign the transaction
      const private_key = JSON.parse(this._addminAddress.secret).private_key;
      const kms_data_key_id = JSON.parse(
        this._addminAddress.secret
      ).kms_data_key_id;
      let secret = await this.kmsService.decrypt(private_key, kms_data_key_id);

      if (secret.startsWith("0x")) {
        secret = secret.substr(2);
      }

      const ethTx = EthereumTx.fromSerializedTx(
        Buffer.from(unsignedRaw, "hex"),
        { common: this._common }
      );
      const privateKey = Buffer.from(secret, "hex");
      const signedTx = ethTx.sign(privateKey);

      const txid = `0x${signedTx.hash().toString("hex")}`;
      const signedRaw = `0x${signedTx.serialize().toString("hex")}`;

      // send the transaction
      const receipt = await this.provider.sendTransaction(signedRaw);
      logger.info(
        `${
          this.currency.network
        } ExecuteRoundWorkerService::executeRound txid=${txid}, receipt=${JSON.stringify(
          receipt
        )}`
      );

      await this.delay(12 * 1000);
    } catch (e) {
      throw e;
    }
  }

  async pause() {
    try {
      if (!this._executeRoundContract._address) {
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::checkBalance No address found`
        );
        return;
      }

      // construct the transaction data
      const fromAddress = this._addminAddress.address;
      const nonce = await this._web3.eth.getTransactionCount(fromAddress);
      const _gasPrice = await this.getGasPrice();

      const gasPrice = this._web3.utils.toBN(_gasPrice);
      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::pause gasPrice=${gasPrice}`
      );

      let _gasLimit = await this._executeRoundContract.methods
        .pause()
        .estimateGas({ from: fromAddress });

      if (_gasLimit < 150000) {
        _gasLimit = 150000;
      }

      const gasLimit = this._web3.utils.toBN(_gasLimit);
      const fee = gasPrice.mul(gasLimit);

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::pause fee=${fee}, gasLimit=${gasLimit}`
      );
      /**
       * Reference from Bridge:
       * Check whether the balance of hot wallet is enough to send
       */
      const ethBalance = this._web3.utils.toBN(
        (await this._web3.eth.getBalance(fromAddress)).toString()
      );

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::pause ethBalance=${ethBalance}`
      );

      if (ethBalance.lt(fee)) {
        throw new Error(
          `${this.currency.network} ExecuteRoundWorkerService::constructRawTransaction Could not construct tx because of lacking fee: address=${fromAddress}, fee=${fee}, ethBalance=${ethBalance}`
        );
      }

      const txParams = {
        data: this._executeRoundContract.methods.pause().encodeABI(),
        gasLimit: this._web3.utils.toHex(gasLimit),
        gasPrice: this._web3.utils.toHex(gasPrice),
        nonce: this._web3.utils.toHex(nonce),
        to: this._executeRoundContract._address,
        value: this._web3.utils.toHex(0),
      };

      const tx = new EthereumTx(txParams, { common: this._common });
      const unsignedRaw = tx.serialize().toString("hex");

      // sign the transaction
      const private_key = JSON.parse(this._addminAddress.secret).private_key;
      const kms_data_key_id = JSON.parse(
        this._addminAddress.secret
      ).kms_data_key_id;
      let secret = await this.kmsService.decrypt(private_key, kms_data_key_id);

      if (secret.startsWith("0x")) {
        secret = secret.substr(2);
      }

      const ethTx = EthereumTx.fromSerializedTx(
        Buffer.from(unsignedRaw, "hex"),
        { common: this._common }
      );
      const privateKey = Buffer.from(secret, "hex");
      const signedTx = ethTx.sign(privateKey);

      const txid = `0x${signedTx.hash().toString("hex")}`;
      const signedRaw = `0x${signedTx.serialize().toString("hex")}`;

      // send the transaction
      const receipt = await this.provider.sendTransaction(signedRaw);
      logger.info(
        `${
          this.currency.network
        } ExecuteRoundWorkerService::pause txid=${txid}, receipt=${JSON.stringify(
          receipt
        )}`
      );

      // delay 5 seconds (interval time)
      await this.delay(12 * 1000);
    } catch (e) {
      logger.error(
        `${this.currency.network} ExecuteRoundWorkerService::pause error=${e.message}`
      );
      throw e;
    }
  }

  async unPause() {
    try {
      if (!this._executeRoundContract._address) {
        logger.error(
          `${this.currency.network} ExecuteRoundWorkerService::checkBalance No address found`
        );
        return;
      }

      // construct the transaction data
      const fromAddress = this._addminAddress.address;
      const nonce = await this._web3.eth.getTransactionCount(fromAddress);
      const _gasPrice = await this.getGasPrice();

      const gasPrice = this._web3.utils.toBN(_gasPrice);
      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::unpause gasPrice=${gasPrice}`
      );

      let _gasLimit = await this._executeRoundContract.methods
        .unpause()
        .estimateGas({ from: fromAddress });

      if (_gasLimit < 150000) {
        _gasLimit = 150000;
      }

      const gasLimit = this._web3.utils.toBN(_gasLimit);
      const fee = gasPrice.mul(gasLimit);

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::unpause fee=${fee}, gasLimit=${gasLimit}`
      );
      /**
       * Reference from Bridge:
       * Check whether the balance of hot wallet is enough to send
       */
      const ethBalance = this._web3.utils.toBN(
        (await this._web3.eth.getBalance(fromAddress)).toString()
      );

      logger.info(
        `${this.currency.network} ExecuteRoundWorkerService::unpause ethBalance=${ethBalance}`
      );

      if (ethBalance.lt(fee)) {
        throw new Error(
          `${this.currency.network} ExecuteRoundWorkerService::constructRawTransaction Could not construct tx because of lacking fee: address=${fromAddress}, fee=${fee}, ethBalance=${ethBalance}`
        );
      }

      const txParams = {
        data: this._executeRoundContract.methods.unpause().encodeABI(),
        gasLimit: this._web3.utils.toHex(gasLimit),
        gasPrice: this._web3.utils.toHex(gasPrice),
        nonce: this._web3.utils.toHex(nonce),
        to: this._executeRoundContract._address,
        value: this._web3.utils.toHex(0),
      };

      const tx = new EthereumTx(txParams, { common: this._common });
      const unsignedRaw = tx.serialize().toString("hex");

      // sign the transaction
      const private_key = JSON.parse(this._addminAddress.secret).private_key;
      const kms_data_key_id = JSON.parse(
        this._addminAddress.secret
      ).kms_data_key_id;
      let secret = await this.kmsService.decrypt(private_key, kms_data_key_id);

      if (secret.startsWith("0x")) {
        secret = secret.substr(2);
      }

      const ethTx = EthereumTx.fromSerializedTx(
        Buffer.from(unsignedRaw, "hex"),
        { common: this._common }
      );
      const privateKey = Buffer.from(secret, "hex");
      const signedTx = ethTx.sign(privateKey);

      const txid = `0x${signedTx.hash().toString("hex")}`;
      const signedRaw = `0x${signedTx.serialize().toString("hex")}`;

      // send the transaction
      const receipt = await this.provider.sendTransaction(signedRaw);
      logger.info(
        `${
          this.currency.network
        } ExecuteRoundWorkerService::unpause txid=${txid}, receipt=${JSON.stringify(
          receipt
        )}`
      );

      // delay 5 seconds (interval time)
      await this.delay(12 * 1000);
    } catch (e) {
      logger.error(
        `${this.currency.network} ExecuteRoundWorkerService::unpause error=${e.message}`
      );
      throw e;
    }
  }

  convertTokenBalance(balance: BigNumber, decimals: number) {
    return balance.div(new BigNumber(10).pow(decimals));
  }

  /**
   * Step 1: Get the data from the blockchain
   * @returns {Promise<void>}
   */
  async crawlData() {
    return await getConnection().transaction(async (manager) => {
      console.log("zzz2");
      
      let latestBlockInDb = await manager
        .getRepository(LatestBlock)
        .createQueryBuilder("latest_block")
        .useTransaction(true)
        .setLock("pessimistic_write")
        .where({
          currency:
            PREFIX_KEY +
            this.currency.network +
            "_" +
            this._executeRoundContract._address,
        })
        .getOne();

      let latestTempBlockInDb = await manager
        .getRepository(LatestBlock)
        .findOne({
          currency:
            PREFIX_KEY_TEMP +
            this.currency.network +
            "_" +
            this._executeRoundContract._address,
        });
      const latestBlock = await getBlockNumber(
        this.currency.chainId,
        this._web3
      );

      if (!latestBlockInDb || latestBlockInDb.blockNumber == 0) {
        latestBlockInDb = new LatestBlock();
        latestBlockInDb.currency =
          PREFIX_KEY +
          this.currency.network +
          "_" +
          this._executeRoundContract._address;

        // get latest block number from zk-sync
        latestBlockInDb.blockNumber = 5582812;

        if (latestBlockInDb.blockNumber) {
          await manager.getRepository(LatestBlock).save(latestBlockInDb);
        }

        return false;
      }
      if (!latestTempBlockInDb) {
        latestTempBlockInDb = new LatestBlock();
        latestTempBlockInDb.currency =
          PREFIX_KEY_TEMP +
          this.currency.network +
          "_" +
          this._executeRoundContract._address;
        latestTempBlockInDb.blockNumber = latestBlockInDb.blockNumber;
      }

      //TODO: SET REQUIRED CONFIRMATION BLOCK
      let fromBlock = latestBlockInDb.blockNumber + 1;
      // let toBlock = latestBlock - this.currency.requiredConfirmations;
      let toBlock = latestBlock;
      // max crawl many blocks per time
      if (toBlock > fromBlock + MAX_BLOCK_PER_TIME) {
        toBlock = fromBlock + MAX_BLOCK_PER_TIME;
      }

      let tempFromBlock = Math.max(
        toBlock + 1,
        latestTempBlockInDb.blockNumber + 1
      );
      let tempToBlock = latestBlock - this.currency.tempRequiredConfirmations;
      // max crawl many blocks per time
      if (tempToBlock > tempFromBlock + MAX_BLOCK_PER_TIME) {
        tempToBlock = tempFromBlock + MAX_BLOCK_PER_TIME;
      }

      if (fromBlock <= toBlock) {
        logger.info(
          `${this.currency.network} ExecuteRoundWorkerService::crawlData ${this._executeRoundContract._address} Crawling from block ${fromBlock} => ${toBlock} (lastest block: ${latestBlock})`
        );
        await this.crawlBlock(manager, fromBlock, toBlock, latestBlock, false);
        // await this.crawlBlock(manager, tempFromBlock, tempToBlock, latestBlock, true);
      }

      return toBlock - fromBlock > 1;
    });
  }

  async crawlBlock(
    _manager,
    _fromBlock: number,
    _toBlock: number,
    _latestBlock: number,
    _isTemp: boolean = false
  ) {
    if (
      !_isTemp ||
      _latestBlock - _toBlock <= this.currency.requiredConfirmations
    ) {
      let blockObj = {
        fromBlock: _fromBlock,
        toBlock: _toBlock,
      };

      let [
        startRoundEvents,
        lockRoundEvents,
        endRoundEvents,
        betUp,
        betDown,
        pause,
        claim,
      ] = await Promise.all([
        this._executeRoundContract.getPastEvents("StartRound", blockObj),
        this._executeRoundContract.getPastEvents("LockRound", blockObj),
        this._executeRoundContract.getPastEvents("EndRound", blockObj),
        this._executeRoundContract.getPastEvents("BetUp", blockObj),
        this._executeRoundContract.getPastEvents("BetDown", blockObj),
        this._executeRoundContract.getPastEvents("Pause", blockObj),
        this._executeRoundContract.getPastEvents("Claim", blockObj),
      ]);

      let status = _isTemp ? OnchainStatus.CONFIRMING : OnchainStatus.CONFIRMED;

      await Promise.all([
        this.handleStartRoundEvents(
          _manager,
          startRoundEvents,
          status,
          _isTemp
        ),
        this.handleLockRoundEvents(_manager, lockRoundEvents, status, _isTemp),
        this.handleEndRoundEvents(_manager, endRoundEvents, status, _isTemp),
        this.handleBetUpEvents(_manager, betUp, status, _isTemp),
        this.handleBetDownEvents(_manager, betDown, status, _isTemp),
        this.handlePauseEvents(_manager, pause, status, _isTemp),
        this.handleClaimEvents(_manager, claim, status, _isTemp),
      ]);
      if (!_isTemp) {
        await _manager.delete(RoundOnchain, {
          status: OnchainStatus.CONFIRMING,
          blockNumber: LessThanOrEqual(_toBlock),
        });
      }
      // update latest block in transaction
      const latestBlockKey = _isTemp
        ? PREFIX_KEY_TEMP +
          this.currency.network +
          "_" +
          this._executeRoundContract._address
        : PREFIX_KEY +
          this.currency.network +
          "_" +
          this._executeRoundContract._address;
      let latestBlock = await _manager.findOne(LatestBlock, {
        currency: latestBlockKey,
      });
      if (!latestBlock) {
        latestBlock = new LatestBlock();
        latestBlock.currency = latestBlockKey;
      }
      latestBlock.blockNumber = _toBlock;
      await _manager.save(latestBlock);
    }
  }

  async handleEndRoundEvents(_manager, _events, _status, _isTemp) {
    return Promise.all(
      _events.map(async (event) => {
        return limit(async () => {
          const endRoundInfo: any = await this._executeRoundContract.methods
            .rounds(event.returnValues.epoch)
            .call();
          let treasuryFee: any = await this._executeRoundContract.methods
            .treasuryFee()
            .call();

          // const blockData: any = wait this.web3Cache("getBlock_" + event.blockNumber, this._web3.eth.getBlock(event.blockNumber));
          await _manager
            .createQueryBuilder()
            .update(RoundOnchain)
            .set({
              closePrice: this.convertTokenBalance(
                BigNumber(endRoundInfo.closePrice),
                decimalsNumber
              ).toString(),
              closeTimeStamp: Number(endRoundInfo.closeTimestamp),
              roundOnchainStatus: OnchainRoundStatus.ENDED,
            })
            .where("epoch_number = :epoch", {
              epoch: Number(event.returnValues.epoch),
            })
            .execute();

          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::handleEndRoundEvents ${this._executeRoundContract._address} endRoundInfo ${endRoundInfo} at block ${event.blockNumber}`
          );
          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::handleEndRoundEvents ${this._executeRoundContract._address} EndRound ${event.returnValues.epoch} ${_status}`
          );
          logger.info(
            `${
              this.currency.network
            } ExecuteRoundWorkerService::handleEndRoundEvents ${
              this._executeRoundContract._address
            } up or down = ${
              Number(endRoundInfo.lockPrice) > Number(endRoundInfo.closePrice)
            }`
          );
          logger.info(
            `${
              this.currency.network
            } ExecuteRoundWorkerService::handleEndRoundEvents ${
              this._executeRoundContract._address
            } up or down = ${
              Number(endRoundInfo.lockPrice) < Number(endRoundInfo.closePrice)
            }`
          );

          if (
            Number(endRoundInfo.lockPrice) < Number(endRoundInfo.closePrice)
          ) {
            await _manager
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                status: 1,
              })
              .where("round_epoch = :epoch AND position = :position", {
                epoch: Number(event.returnValues.epoch),
                position: "up",
              })
              .execute();

            await _manager
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                status: 0,
              })
              .where("round_epoch = :epoch AND position = :position", {
                epoch: Number(event.returnValues.epoch),
                position: "down",
              })
              .execute();
            logger.info(
              `${this.currency.network} ExecuteRoundWorkerService::handleEndRoundEvents ${this._executeRoundContract._address} EndRound ${event.returnValues.epoch} ${_status} update UP WIN bet status`
            );
          } else if (
            Number(endRoundInfo.lockPrice) > Number(endRoundInfo.closePrice)
          ) {
            await _manager
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                status: 0,
              })
              .where("round_epoch = :epoch AND position = :position", {
                epoch: Number(event.returnValues.epoch),
                position: "up",
              })
              .execute();

            await _manager
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                status: 1,
              })
              .where("round_epoch = :epoch AND position = :position", {
                epoch: Number(event.returnValues.epoch),
                position: "down",
              })
              .execute();

            logger.info(
              `${this.currency.network} ExecuteRoundWorkerService::handleEndRoundEvents ${this._executeRoundContract._address} EndRound ${event.returnValues.epoch} ${_status} update DOWN WIN bet status`
            );
          } else {
            await getConnection()
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                status: 0,
              })
              .where("round_epoch = :epoch", {
                epoch: Number(event.returnValues.epoch),
              })
              .execute();

            logger.info(
              `${this.currency.network} ExecuteRoundWorkerService::handleEndRoundEvents ${this._executeRoundContract._address} EndRound ${event.returnValues.epoch} ${_status} update WIN bet status`
            );
          }
          let totalWin = await _manager
            .createQueryBuilder(BetOnchain, "bet_onchain")
            .select("SUM(bet_onchain.amount) as totalWin")
            .where(
              "bet_onchain.round_epoch = :epoch and bet_onchain.status = 1",
              { epoch: Number(event.returnValues.epoch) }
            )
            .execute();
          let totalLose = await _manager
            .createQueryBuilder(BetOnchain, "bet_onchain")
            .select("SUM(bet_onchain.amount) as totalLose")
            .where(
              "bet_onchain.round_epoch = :epoch and bet_onchain.status = 0",
              { epoch: Number(event.returnValues.epoch) }
            )
            .execute();

          if (
            !Number(totalWin[0].totalWin) ||
            !Number(totalLose[0].totalLose)
          ) {
            _manager
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                winAmount: () => `amount * (1-${Number(treasuryFee) / 10000})`,
              })
              .where("round_epoch = :epoch", {
                epoch: Number(event.returnValues.epoch),
              })
              .execute();
            return;
          }

          totalWin = Number(totalWin[0].totalWin);
          totalLose = Number(totalLose[0].totalLose);
          const items = await _manager
            .createQueryBuilder(BetOnchain, "b")
            .where("b.round_epoch = :epoch AND b.status = :status", {
              epoch: Number(event.returnValues.epoch),
              status: 1,
            })
            .getMany();
          const promises = items.map(async (item: any) => {
            item.winAmount =
              (parseFloat(item.amount) / totalWin) *
              (totalLose + totalWin) *
              (1 - Number(treasuryFee) / 10000);
            return await _manager.save(item);
          });

          await Promise.all(promises);
        });
      })
    );
  }

  async handleStartRoundEvents(_manager, _events, _status, _isTemp) {
    return Promise.all(
      _events.map(async (event) => {
        return limit(async () => {
          const startRoundInfo = await this._executeRoundContract.methods
            .rounds(event.returnValues.epoch)
            .call();
          const blockData: any = await this.web3Cache(
            "getBlock_" + event.blockNumber,
            this._web3.eth.getBlock(event.blockNumber)
          );
          const roundOnchain = new RoundOnchain();
          roundOnchain.epochNumber = Number(event.returnValues.epoch);
          roundOnchain.blockTimeStamp = blockData.timestamp;
          roundOnchain.startTimeStamp = Number(startRoundInfo.startTimestamp);
          roundOnchain.blockHash = event.blockHash;
          roundOnchain.status = _status;
          roundOnchain.blockNumber = event.blockNumber;
          roundOnchain.roundOnchainStatus = OnchainRoundStatus.STARTED;
          roundOnchain.roundExecuted = false;
          logger.info(
            `${
              this.currency.network
            } ExecuteRoundWorkerService::handleStartRoundEvents txid=${
              event.transactionHash
            } epoch=${event.returnValues.epoch} blockTimeStamp=${
              blockData.timestamp
            } startTimeStamp=${Number(startRoundInfo[1])}`
          );
          await _manager.save(roundOnchain);

          await this.sendRefreshRoundNotification(
            SocketEvents.REFRESH_ROUND,
            roundOnchain
          );
        });
      })
    );
  }

  async handleLockRoundEvents(_manager, _events, _status, _isTemp) {
    return Promise.all(
      _events.map(async (event) => {
        return limit(async () => {
          const lockRoundInfo = await this._executeRoundContract.methods
            .rounds(event.returnValues.epoch)
            .call();
          // const blockData: any = await this.web3Cache("getBlock_" + event.blockNumber, this._web3.eth.getBlock(event.blockNumber));
          await _manager
            .createQueryBuilder()
            .update(RoundOnchain)
            .set({
              lockPrice: this.convertTokenBalance(
                BigNumber(event.returnValues.price),
                decimalsNumber
              ).toString(),
              lockTimeStamp: Number(lockRoundInfo.lockTimestamp),
              totalAmount: String(lockRoundInfo.totalAmount),
              upAmount: String(lockRoundInfo.upAmount),
              downAmount: String(lockRoundInfo.downAmount),
              rewardBaseCalAmount: String(lockRoundInfo.rewardBaseCalAmount),
              rewardAmount: String(lockRoundInfo.rewardAmount),
              roundExecuted: true,
              roundOnchainStatus: OnchainRoundStatus.LOCKED,
            })
            .where("epoch_number = :epoch", {
              epoch: Number(event.returnValues.epoch),
            })
            .execute();
          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::handleLockRoundEvents txid=${event.transactionHash} epoch=${event.returnValues.epoch} lockPrice=${event.returnValues.price}`
          );
        });
      })
    );
  }

  async handlePauseEvents(_manager, _events, _status, _isTemp) {
    return Promise.all(
      _events.map(async (event) => {
        let treasuryFee: any = await this._executeRoundContract.methods
          .treasuryFee()
          .call();
        const beforeEpoch = await _manager
          .createQueryBuilder(RoundOnchain, "round_on_chain")
          .select("round_on_chain.round_onchain_status as round_onchain_status")
          .where("round_on_chain.epoch_number = :epoch", {
            epoch: Number(event.returnValues.epoch) - 1,
          })
          .execute();
        return limit(async () => {
          if (
            beforeEpoch &&
            beforeEpoch.length &&
            String(beforeEpoch[0]["round_onchain_status"]) === "LOCKED"
          ) {
            await _manager
              .createQueryBuilder()
              .update(RoundOnchain)
              .set({
                isSuccess: false,
              })
              .where("epoch_number IN (:currentEpoch, :beforeEpoch)", {
                currentEpoch: Number(event.returnValues.epoch),
                beforeEpoch: Number(Number(event.returnValues.epoch) - 1),
              })
              .execute();

            await _manager
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                winAmount: () => `amount * (1-${Number(treasuryFee) / 10000})`,
              })
              .where("round_epoch IN (:currentEpoch, :beforeEpoch)", {
                currentEpoch: Number(event.returnValues.epoch),
                beforeEpoch: Number(Number(event.returnValues.epoch) - 1),
              })
              .execute();
          } else if (
            !beforeEpoch ||
            !beforeEpoch.length ||
            String(beforeEpoch[0]["round_onchain_status"]) === "STARTED"
          ) {
            await _manager
              .createQueryBuilder()
              .update(RoundOnchain)
              .set({
                isSuccess: false,
              })
              .where("epoch_number = :epoch", {
                epoch: Number(event.returnValues.epoch),
              })
              .execute();

            await _manager
              .createQueryBuilder()
              .update(BetOnchain)
              .set({
                winAmount: () => `amount * (1-${Number(treasuryFee) / 10000})`,
              })
              .where("round_epoch = :epoch", {
                epoch: Number(event.returnValues.epoch),
              })
              .execute();
          }
          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::handlePauseEvents txid=${event.transactionHash} epoch=${event.returnValues.epoch}`
          );
        });
      })
    );
  }

  async handleBetUpEvents(_manager, _events, _status, _isTemp) {
    return Promise.all(
      _events.map(async (event) => {
        return limit(async () => {
          // const blockData: any = await this.web3Cache("getBlock_" + event.blockNumber, this._web3.eth.getBlock(event.blockNumber));
          const blockData: any = await this.web3Cache(
            "getBlock_" + event.blockNumber,
            this._web3.eth.getBlock(event.blockNumber)
          );
          const betOnchain = new BetOnchain();
          betOnchain.sender = String(event.returnValues.sender);
          betOnchain.roundEpoch = Number(event.returnValues.epoch);
          (betOnchain.amount = Number(
            this.convertTokenBalance(
              BigNumber(event.returnValues.amount),
              decimalsNumber
            )
          )),
            (betOnchain.position = "up");
          betOnchain.claim = false;
          betOnchain.startTimeStamp = event.returnValues.startTimeStamp;
          betOnchain.blockHash = event.blockHash;
          betOnchain.blockTimeStamp = blockData.timestamp;
          betOnchain.blockNumber = event.blockNumber;
          await _manager.save(betOnchain);
          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::handleBetUpEvents txid=${event.transactionHash} epoch=${event.returnValues.epoch} amount=${event.returnValues.amount} sender=${event.returnValues.sender}`
          );
        });
      })
    );
  }

  async handleBetDownEvents(_manager, _events, _status, _isTemp) {
    return Promise.all(
      _events.map(async (event) => {
        return limit(async () => {
          // const blockData: any = await this.web3Cache("getBlock_" + event.blockNumber, this._web3.eth.getBlock(event.blockNumber));
          const blockData: any = await this.web3Cache(
            "getBlock_" + event.blockNumber,
            this._web3.eth.getBlock(event.blockNumber)
          );
          const betOnchain = new BetOnchain();
          betOnchain.sender = String(event.returnValues.sender);
          betOnchain.roundEpoch = event.returnValues.epoch;
          (betOnchain.amount = Number(
            this.convertTokenBalance(
              BigNumber(event.returnValues.amount),
              decimalsNumber
            )
          )),
            (betOnchain.position = "down");
          betOnchain.claim = false;
          betOnchain.startTimeStamp = event.returnValues.startTimeStamp;
          betOnchain.blockTimeStamp = blockData.timestamp;
          betOnchain.blockHash = event.blockHash;
          betOnchain.blockNumber = event.blockNumber;
          await _manager.save(betOnchain);
          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::handleBetDownEvents txid=${event.transactionHash} epoch=${event.returnValues.epoch} amount=${event.returnValues.amount} sender=${event.returnValues.sender}`
          );
        });
      })
    );
  }

  async handleClaimEvents(_manager, _events, _status, _isTemp) {
    return Promise.all(
      _events.map(async (event) => {
        return limit(async () => {
          await _manager
            .createQueryBuilder()
            .update(BetOnchain)
            .set({
              claim: true,
              winAmount: Number(
                this.convertTokenBalance(
                  BigNumber(event.returnValues.amount),
                  decimalsNumber
                )
              ),
            })
            .where("round_epoch = :epoch", {
              epoch: Number(event.returnValues.epoch),
            })
            .andWhere("sender = :sender", { sender: event.returnValues.sender })
            .execute();
          logger.info(
            `${this.currency.network} ExecuteRoundWorkerService::handleClaimEvents txid=${event.transactionHash} epoch=${event.returnValues.epoch} amount=${event.returnValues.amount} sender=${event.returnValues.sender}`
          );
        });
      })
    );
  }

  async sendRefreshRoundNotification(event, round) {
    const sendData = this.socketService.createSocketData(null, event, round);
    await this.socketService.sendToSocket(sendData, event);
  }

  public async getGasPrice(): Promise<BigNumber> {
    return new BigNumber(await this._web3.eth.getGasPrice());
  }

  async delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  async web3Cache(key, func) {
    let value = nodeCache.get(key);
    if (value == undefined) {
      // handle miss!
      value = await func;
      nodeCache.set(key, value);
      return value;
    }
    return value;
  }
}
