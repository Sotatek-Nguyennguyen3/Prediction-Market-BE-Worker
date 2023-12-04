import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BetOnchain } from "../../database/entities";
import { getConnection, Repository } from "typeorm";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { getArrayPaginationBuildTotal, getOffset } from "src/shared/Utils";

@Injectable()
export class BetHistoryService {
  constructor(
    @InjectRepository(BetOnchain)
    private readonly betOnChainRepository: Repository<BetOnchain>
  ) {}

  async listBetHistories(params, paginationOptions: IPaginationOptions) {
    let offset = getOffset(paginationOptions);
    let limit = Number(paginationOptions.limit);

    let queryBuilder = getConnection()
      .createQueryBuilder(BetOnchain, "bet_onchain")
      .select(
        "bet_onchain.position as position, bet_onchain.amount as amount," +
          "bet_onchain.claim as claim, bet_onchain.round_epoch as roundEpoch, " +
          "bet_onchain.win_amount as winAmount," +
          "bet_onchain.status as status, bet_onchain.block_hash as blockHash," +
          "bet_onchain.block_time_stamp as blockTimeStamp, " +
          "bet_onchain.block_number as blockNumber, " +
          "bet_onchain.created_at as createdAt"
      )
      .orderBy("bet_onchain.created_at", "DESC")
      .limit(limit)
      .offset(offset);

    let queryCount = getConnection()
      .createQueryBuilder(BetOnchain, "bet_onchain")
      .select("Count (1) as Total")
      .orderBy("bet_onchain.created_at", "DESC");
    if (params.wallet) {
      queryBuilder.andWhere(`bet_onchain.sender =:wallet`, {
        wallet: params.wallet,
      });
      queryCount.andWhere(`bet_onchain.sender =:wallet`, {
        wallet: params.wallet,
      });
    }
    if (params.claim) {
      queryBuilder.andWhere(`bet_onchain.claim =:claim`, {
        claim: params.claim,
      });
      queryCount.andWhere(`bet_onchain.claim =:claim`, {
        claim: params.claim,
      });
    }
    if (params.status) {
      queryBuilder.andWhere(`bet_onchain.status =:status`, {
        status: params.status,
      });
      queryCount.andWhere(`bet_onchain.status =:status`, {
        status: params.status,
      });
    }
    if (params.roundEpoch) {
      queryBuilder.andWhere(`bet_onchain.round_epoch =:roundEpoch`, {
        roundEpoch: params.roundEpoch,
      });
      queryCount.andWhere(`bet_onchain.round_epoch =:roundEpoch`, {
        roundEpoch: params.roundEpoch,
      });
    }

    let betOnChain = await queryBuilder.execute();
    let betOnChainCountList = await queryCount.execute();

    const { items, meta } = getArrayPaginationBuildTotal<BetOnchain>(
      betOnChain,
      betOnChainCountList,
      paginationOptions
    );

    return {
      result: items,
      pagination: meta,
    };
  }
}
