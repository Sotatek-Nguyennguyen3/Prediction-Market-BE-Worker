import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  Address,
  BetOnchain,
  CurrencyConfig,
  RoundOnchain,
  User,
} from "../../database/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { CreateUser } from "./request/createUser.dto";
import { Repository } from "typeorm";
import Web3 from "web3";
import { Causes } from "src/config/exception/causes";
import { values } from "lodash";
import { SignatureBet } from "./request/signatureBet.dto";
import { ethers, Signature } from "ethers";
import { KmsService } from "../common/kms.service";
const fs = require("fs");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(BetOnchain)
    private betOnchainRepository: Repository<BetOnchain>,

    @InjectRepository(RoundOnchain)
    private roundOnchainRepository: Repository<RoundOnchain>,

    @InjectRepository(CurrencyConfig)
    private currencyConfig: Repository<CurrencyConfig>,

    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
    private readonly kmsService: KmsService
  ) {}
  _web3 = new Web3();

  //register
  async checkDuplicatedUser(data: CreateUser): Promise<any> {
    //check duplicated username or email
    const duplicatedUser = await this.userRepository.find({
      wallet: data.wallet,
    });
    return duplicatedUser;
  }

  async registerUser(data: { wallet: string; signature: string }) {
    let user = new User();
    user.wallet = data.wallet;
    user.nonce = 1;
    user = await this.userRepository.save(user);
    delete user.nonce;
    return user;
  }

  async getRoundStatistic(wallet: string) {
    let user = await this.userRepository.findOne({ wallet: wallet });
    if (!user) throw Causes.USER_ERROR;

    let userBet = await this.betOnchainRepository.find({ sender: wallet });
    if (!userBet.length) throw Causes.USER_BET_ONCHAIN_NOT_FOUND;

    let roundStatisticWin = await this.betOnchainRepository
      .createQueryBuilder("bet_on_chain")
      .select(
        "COUNT(bet_on_chain.id) as total_win_round, SUM(bet_on_chain.win_amount) as total_win_token"
      )
      .where("bet_on_chain.sender = :wallet and bet_on_chain.status = 1", {
        wallet: wallet,
      })
      .getRawOne();

    let bestRound = await this.betOnchainRepository
      .createQueryBuilder("bet_on_chain")
      .select(
        "bet_on_chain.win_amount as best_money, bet_on_chain.round_epoch as best_epoch"
      )
      .where("bet_on_chain.sender = :wallet and bet_on_chain.status = 1", {
        wallet: wallet,
      })
      .orderBy("bet_on_chain.win_amount", "DESC")
      .getRawOne();

    let roundStatisticLose = await this.betOnchainRepository
      .createQueryBuilder("bet_on_chain")
      .select(
        "COUNT(bet_on_chain.id) as total_lose_round, SUM(bet_on_chain.amount) as total_lose_token"
      )
      .where("bet_on_chain.sender = :wallet and bet_on_chain.status = 0", {
        wallet: wallet,
      })
      .getRawOne();

    let totalRound = await this.betOnchainRepository
      .createQueryBuilder("bet_on_chain")
      .select(
        "COUNT(bet_on_chain.id) as total_round, SUM(bet_on_chain.amount) as total_enter"
      )
      .where("bet_on_chain.sender = :wallet", { wallet: wallet })
      .getRawOne();

    let totalRoundSuccess = await this.betOnchainRepository
      .createQueryBuilder("bet_on_chain")
      .select(
        "COUNT(bet_on_chain.id) as total_round_success, SUM(bet_on_chain.amount) as total_enter_success"
      )
      .where(
        "bet_on_chain.sender = :wallet and bet_on_chain.status IS NOT NULL",
        { wallet: wallet }
      )
      .getRawOne();

    let averageEnterPerRound = (
      Number(totalRoundSuccess["total_enter_success"]) /
      Number(totalRoundSuccess["total_round_success"])
    ).toFixed(6);
    let totalIncome =
      Number(roundStatisticWin["total_win_token"]) -
      Number(roundStatisticLose["total_lose_token"]);
    let averageReturnPerRound = (
      totalIncome / Number(totalRoundSuccess["total_round_success"])
    ).toFixed(6);
    totalIncome.toFixed(6);
    console.log(
      roundStatisticWin,
      roundStatisticLose,
      totalRound,
      averageEnterPerRound,
      totalIncome,
      averageReturnPerRound,
      bestRound
    );

    return {
      totalRound: Number(totalRound["total_round"]),
      totalRoundSuccess: Number(totalRoundSuccess["total_round_success"]),
      totalIncome: Number(totalIncome),
      totalWinRound: Number(roundStatisticWin["total_win_round"]),
      totalWinToken: Number(roundStatisticWin["total_win_token"]),
      totalLoseRound: Number(roundStatisticLose["total_lose_round"]),
      totalLoseToken: Number(roundStatisticLose["total_lose_token"]),
      averageEnterPerRound: Number(averageEnterPerRound),
      averageReturnPerRound: Number(averageReturnPerRound),
      bestRound: Number(
        bestRound && bestRound["best_epoch"] ? bestRound["best_epoch"] : 0
      ),
      bestMoney: Number(
        bestRound && bestRound["best_money"] ? bestRound["best_money"] : 0
      ),
    };
  }

  async checkRound(data: number): Promise<any> {
    const roundOnchain = this.roundOnchainRepository.findOne(data);
    if (!roundOnchain) throw Causes.ID_ROUND_ONCHAIN_NOT_FOUND;
    return roundOnchain;
  }

  async checkValidWallet(data: any): Promise<any> {
    const nonce = await this.getNonce(data.wallet);
    const wallet = this._web3.eth.accounts.recover(
      process.env.SIGNATURE_TEXT + ` Nonce: ${nonce}`,
      data.signature
    );
    if (!wallet || wallet != data.wallet) throw Causes.INVALID_SIGNATURE_WALLET;
  }

  async getNonce(address: string) {
    const user = await this.userRepository.findOne({
      wallet: address,
    });
    if (!user) return 0;

    return user.nonce;
  }

  async updateNonce(address: string) {
    const nonce = await this.getNonce(address);
    await this.userRepository.update({ wallet: address }, { nonce: nonce + 1 });

    return nonce + 1;
  }

  async signatureBet(data: SignatureBet): Promise<any> {
    const checkUser = await this.userRepository.findOne({ wallet: data.user });
    if (!checkUser) {
      throw Causes.NON_RECORDED_USERNAME;
    }
    let chainId = data.chainId;
    let currency = await this.currencyConfig.findOne({ chainId });

    let epoch = await this.getCurrentEpochFromW3(chainId);
    let epochIndb = await this.roundOnchainRepository.findOne({
      epochNumber: Number(epoch),
    });

    if (!epochIndb) throw Causes.NO_ROUND_RECORD;
    if (Date.now() / 1000 - epochIndb.startTimeStamp > 300) {
      throw Causes.LOCKED_ROUND;
    }

    let smartContractAddress = JSON.parse(currency.tokenAddresses)?.[
      "prediction"
    ];
    let userWallet = data.user;
    let signature = null;
    let dataHash = this.encodeData(
      chainId,
      epoch,
      userWallet,
      smartContractAddress
    );

    console.log(chainId, epoch, userWallet, smartContractAddress, dataHash);

    let messageHashBinary = ethers.utils.arrayify(dataHash);

    //Handle kms
    const masterWalletAddress = await this.addressesRepository.findOne({
      note: "Master_Wallet",
    });
    if (!masterWalletAddress) {
      throw Causes.DID_NOT_CONFIG_MASTER_WALLET;
    }

    const private_key = JSON.parse(masterWalletAddress.secret).private_key;
    const kms_data_key_id = JSON.parse(
      masterWalletAddress.secret
    ).kms_data_key_id;

    let secret = await this.kmsService.decrypt(private_key, kms_data_key_id);

    if (secret.startsWith("0x")) {
      secret = secret.substr(2);
    }

    const privateKey = Buffer.from(secret, "hex");
    let wallet = new ethers.Wallet(privateKey);
    console.log(wallet.address);

    signature = await wallet.signMessage(messageHashBinary);

    return {
      epoch: epoch,
      user: userWallet,
      signature,
    };
  }

  encodeData(_chainId, _epoch, _user, _scAddress) {
    const payload = ethers.utils.defaultAbiCoder.encode(
      ["uint256", "uint256", "address", "address"],
      [_chainId, _epoch, _user, _scAddress]
    );
    return ethers.utils.keccak256(payload);
  }

  async getCurrentEpochFromW3(chainId: string) {
    let currency = await this.currencyConfig.findOne({ chainId });
    // console.log(currency, currency?.["rpcEndpoint"], JSON.parse(currency.tokenAddresses)?.["prediction"]);
    let _web3 = new Web3(currency?.["rpcEndpoint"]);
    let _excuteRoundAbi = fs.readFileSync(
      "./smart-contract/ExecuteRound.json",
      "utf8"
    );
    let _executeRoundContract = new _web3.eth.Contract(
      JSON.parse(_excuteRoundAbi),
      JSON.parse(currency.tokenAddresses)?.["prediction"]
    );
    const currentRound = await _executeRoundContract.methods
      .currentEpoch()
      .call();
    return currentRound;
  }
}
