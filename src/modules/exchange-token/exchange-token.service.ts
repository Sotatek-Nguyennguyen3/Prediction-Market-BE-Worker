// import {Injectable} from "@nestjs/common";
// import {InjectRepository} from "@nestjs/typeorm";
// import {TransactionOnchain, TransactionRequest, User} from "../../database/entities";
// import {Repository} from "typeorm";
// import {CreateTransactionRequest} from "./request/create-transaction-request.dto";
// import {TransactionRequestStatus, TransactionRequestType} from "../../shared/enums";
// import Web3 from "web3";
// import {Causes} from "../../config/exception/causes";
// // import {GameServerService} from "./game-server.service";
// import BigNumber from 'bignumber.js';
// import {IPaginationOptions} from "nestjs-typeorm-paginate";
// import {getArrayPaginationBuildTotal, getOffset} from "../../shared/Utils";

// @Injectable()
// export class ExchangeTokenService {

//     private readonly _web3 = new Web3();

//     constructor(
//         @InjectRepository(User)
//         private usersRepository: Repository<User>,

//         @InjectRepository(TransactionRequest)
//         private transactionRequestRepository: Repository<TransactionRequest>,

//         @InjectRepository(TransactionOnchain)
//         private transactionOnchainRepository: Repository<TransactionOnchain>,

//     ) {}

//     async createTransactionRequest(data: CreateTransactionRequest, user: User) {
//         // validate signature
//         // const nonce = await this.authService.getNonce(user.wallet);

//         let walletAddress;
//         // try {
//         //     walletAddress = this._web3.eth.accounts.recover(
//         //         process.env.SIGNATURE_TEXT + ` Nonce: ${nonce}`, data.signature);
//         // } catch (error) {
//         //     throw Causes.INVALID_SIGNATURE;
//         // }

//         if (user.wallet != walletAddress) {
//             throw Causes.INVALID_SIGNATURE;
//         }

//         // validate balance
//         let result;
//         try {
//             result = await this.gameSeverService.getUserBalance(user);
//         } catch (error) {
//             throw Causes.GAME_SERVER_ERROR;
//         }

//         const convertedBalance = new BigNumber(result.balance);
//         const convertedAmount = new BigNumber(data.amount);

//         if (convertedBalance.isLessThan(convertedAmount)) {
//             throw Causes.NOT_ENOUGH_BALANCE;
//         }

//         const transactionRequest = new TransactionRequest();
//         transactionRequest.creatorId = user.id;
//         transactionRequest.creatorAddress = user.wallet;
//         transactionRequest.chainId = data.chainId;
//         transactionRequest.amount = data.amount;
//         transactionRequest.signature = data.signature;
//         transactionRequest.status = TransactionRequestStatus.PENDING;
//         transactionRequest.type = TransactionRequestType.OFF_TO_ON;
//         return await this.transactionRequestRepository.save(transactionRequest);
//     }

//     async getTransaction(id: string, user: User) {
//         // get transaction_request join with transaction_onchain by queryBuilder
//         const transactionRequest = await this.transactionRequestRepository.createQueryBuilder("transaction_request")
//             .select(`
//             transaction_request.id as id, transaction_request.creator_id as creatorId,
//             transaction_request.creator_address as creatorAddress,
//             transaction_request.chain_id as chainId, transaction_request.amount as amount,
//             transaction_request.signature as signature,
//             transaction_request.status as status, transaction_request.type as type,
//             transaction_request.created_at as createdAt,
//             transaction_request.updated_at as updatedAt, transaction_onchain.id as onchainId,
//             transaction_onchain.txid as txid, transaction_onchain.status as onchainStatus,
//             transaction_onchain.type as onchainType,
//             transaction_onchain.error_message as errorMessage, transaction_onchain.fee_amount as feeAmount,
//             transaction_onchain.block_number as blockNumber, transaction_onchain.block_hash as blockHash,
//             transaction_onchain.block_timestamp as blockTimestamp, transaction_onchain.created_at as onchainCreatedAt,
//             transaction_onchain.updated_at as onchainUpdatedAt
//             `)
//             .leftJoin(TransactionOnchain, "transaction_onchain", "transaction_onchain.transaction_request_id = transaction_request.id")
//             .where("transaction_request.id = :id", {id})
//             .andWhere("transaction_request.creator_id = :creatorId", {creatorId: user.id})
//             .andWhere("transaction_request.creatorAddress = :creatorAddress", {creatorAddress: user.wallet})
//             .getRawOne();

//         return transactionRequest;
//     }

//     async getListTransactionRequest(params, paginationOptions: IPaginationOptions, user: User) {
//         let offset = getOffset(paginationOptions);
//         let limit = Number(paginationOptions.limit);

//         let queryBuilder = await this.transactionRequestRepository.createQueryBuilder("transaction_request")
//             .select(`
//             transaction_request.id as id, transaction_request.creator_id as creatorId,
//             transaction_request.creator_address as creatorAddress,
//             transaction_request.chain_id as chainId, transaction_request.amount as amount,
//             transaction_request.signature as signature,
//             transaction_request.status as status, transaction_request.type as type,
//             transaction_request.created_at as createdAt,
//             transaction_request.updated_at as updatedAt, transaction_onchain.id as onchainId,
//             transaction_onchain.txid as txid, transaction_onchain.status as onchainStatus,
//             transaction_onchain.type as onchainType,
//             transaction_onchain.error_message as errorMessage, transaction_onchain.fee_amount as feeAmount,
//             transaction_onchain.block_number as blockNumber, transaction_onchain.block_hash as blockHash,
//             transaction_onchain.block_timestamp as blockTimestamp, transaction_onchain.created_at as onchainCreatedAt,
//             transaction_onchain.updated_at as onchainUpdatedAt
//             `)
//             .leftJoin(TransactionOnchain, "transaction_onchain", "transaction_onchain.transaction_request_id = transaction_request.id")
//             .where("transaction_request.creator_id = :creatorId", {creatorId: user.id})
//             .andWhere("transaction_request.creatorAddress = :creatorAddress", {creatorAddress: user.wallet})
//             .offset(offset)
//             .limit(limit)
//             .orderBy("transaction_request.updated_at", "DESC")

//         let queryCount = await this.transactionRequestRepository.createQueryBuilder("transaction_request")
//             .select("COUNT(*) as Total")
//             .leftJoin(TransactionOnchain, "transaction_onchain", "transaction_onchain.transaction_request_id = transaction_request.id")
//             .where("transaction_request.creator_id = :creatorId", {creatorId: user.id})
//             .andWhere("transaction_request.creatorAddress = :creatorAddress", {creatorAddress: user.wallet})
//             .orderBy("transaction_request.updated_at", "DESC")

//         if (params.status) {
//             queryBuilder = queryBuilder.andWhere("transaction_request.status = :status", {status: params.status});
//             queryCount = queryCount.andWhere("transaction_request.status = :status", {status: params.status});
//         }

//         if (params.type) {
//             queryBuilder = queryBuilder.andWhere("transaction_request.type = :type", {type: params.type});
//             queryCount = queryCount.andWhere("transaction_request.type = :type", {type: params.type});
//         }

//         if (params.chainId) {
//             queryBuilder = queryBuilder.andWhere("transaction_request.chain_id = :chainId", {chainId: params.chainId});
//             queryCount = queryCount.andWhere("transaction_request.chain_id = :chainId", {chainId: params.chainId});
//         }

//         const transactionList = await queryBuilder.execute();
//         const transactionCountList = await queryCount.execute();

//         console.log(transactionCountList);
//         const { items, meta } = getArrayPaginationBuildTotal<any>(
//             transactionList,
//             transactionCountList,
//             paginationOptions
//         );

//         return { items, meta };
//     }
// }
