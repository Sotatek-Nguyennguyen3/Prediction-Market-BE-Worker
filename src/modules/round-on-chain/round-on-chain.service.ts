import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BetOnchain, RoundOnchain } from "../../database/entities";
import {
  CustomRepositoryCannotInheritRepositoryError,
  getConnection,
  Repository,
} from "typeorm";
import { limits } from "argon2";
import { Causes } from "src/config/exception/causes";
import axios from "axios";

@Injectable()
export class RoundOnChainService {
  constructor(
    @InjectRepository(RoundOnchain)
    private readonly RoundOnChainRepository: Repository<RoundOnchain>,
    @InjectRepository(BetOnchain)
    private readonly betOnchainRepository: Repository<BetOnchain>
  ) {}

  async listRounds(wallet: string) {
    let queryBuilder = this.RoundOnChainRepository.createQueryBuilder(
      "round_onchain"
    )
      .select("round_onchain.*")
      .limit(5)
      .orderBy("created_at", "DESC");

    let RoundOnChain = await queryBuilder.execute();

    for (let i = 0; i < RoundOnChain.length; i++) {
      RoundOnChain[i].is_bet = false;
      console.log(RoundOnChain[i].epoch_number);
      console.log(wallet);
      const betOnChain = await this.betOnchainRepository.findOne({
        sender: wallet,
        roundEpoch: RoundOnChain[i].epoch_number,
      });
      console.log(betOnChain);
      if (betOnChain) {
        RoundOnChain[i].is_bet = true;
      }
    }

    return RoundOnChain;
  }

  async currentEpoch() {
    let queryBuilder1 = await this.RoundOnChainRepository.createQueryBuilder(
      "round_onchain"
    )
      .select("MAX(round_onchain.epoch_number) as epoch_number")
      .getRawOne();
    if (!queryBuilder1) throw Causes.NO_ROUND_RECORD;

    let queryBuilder = await this.RoundOnChainRepository.createQueryBuilder(
      "round_onchain"
    )
      .select("round_onchain.epoch_number as epoch_number")
      .where(`round_onchain.epoch_number < :epoch_number`, {
        epoch_number: queryBuilder1["epoch_number"],
      })
      .orderBy("round_onchain.epoch_number", "DESC")
      .getRawOne();

    if (queryBuilder) {
      return queryBuilder["epoch_number"];
    } else {
      return queryBuilder1["epoch_number"];
    }
  }

  async currentPrice() {
    let currentPrice;
    try {
      currentPrice = await axios.get(
        "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=F4ZBZI5ZVN2HZE3UTW1A6UZCAIZ6P4NYD9"
      );
    } catch (error) {
      throw new Error(error);
    }
    return currentPrice.data.result.ethusd;
  }

  async timeCurrentEpoch() {
    let queryBuilderfirst =
      await this.RoundOnChainRepository.createQueryBuilder("round_onchain")
        .select(
          "round_onchain.epoch_number as epoch_number, round_onchain.start_time_stamp as start_time_stamp, round_onchain.is_success as is_success"
        )
        .orderBy("round_onchain.epoch_number", "DESC")
        .getRawOne();
    if (!queryBuilderfirst) throw Causes.NO_ROUND_RECORD;

    let queryBuildersecond =
      await this.RoundOnChainRepository.createQueryBuilder("round_onchain")
        .select(
          "round_onchain.lock_time_stamp as lock_time_stamp, round_onchain.is_success as is_success, round_onchain.epoch_number as epoch_number"
        )
        .where(`round_onchain.epoch_number < :epoch_number`, {
          epoch_number: queryBuilderfirst["epoch_number"],
        })
        .orderBy("round_onchain.epoch_number", "DESC")
        .getRawOne();
    let remainingTime = 0;

    if (!Number(queryBuildersecond["is_success"])) {
      console.log(
        "here",
        Date.now(),
        queryBuildersecond["is_success"],
        Boolean(queryBuildersecond["is_success"])
      );
      remainingTime = Date.now() / 1000 - queryBuilderfirst["start_time_stamp"];
    } else
      remainingTime = Date.now() / 1000 - queryBuildersecond["lock_time_stamp"];
    if (remainingTime <= 0) remainingTime = 0;
    return remainingTime;
  }
}
