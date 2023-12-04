import {
  BetOnchain,
  Config,
  LatestBlock,
  RoundOnchain,
  User,
} from "../../database/entities";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectRepository } from "@nestjs/typeorm";
import { CurrencyConfig } from "../../database/entities";
import { getLogger } from "../../shared/logger";
import { Repository } from "typeorm";
import { NotificationService } from "../notification/notification.service";
import { SocketService } from "./socket.service";
import { S3Handler } from "src/shared/S3Handler";
import { KmsService } from "../common/kms.service";
import { AddressesService } from "../addresses/addresses.service";
import { ExecuteRoundWorkerService } from "./execute-round-worker.service";

const logger = getLogger("WorkerManagerService");

@Injectable()
export class WorkerManagerService {
  constructor(
    private readonly kmsService: KmsService,
    private readonly notificationService: NotificationService,
    private readonly socketService: SocketService,
    private readonly addressesService: AddressesService,
    @InjectRepository(CurrencyConfig)
    private currenciesRepository: Repository<CurrencyConfig>,
    @InjectRepository(LatestBlock)
    private readonly latestBlockRepository: Repository<LatestBlock>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    @InjectRepository(RoundOnchain)
    private readonly roundOnchainRepository: Repository<RoundOnchain>,
    @InjectRepository(BetOnchain)
    private readonly betOnchainRepository: Repository<BetOnchain>,
    private readonly s3handler: S3Handler
  ) {
    this.init();
  }

  async init() {
    let currencies = await this.currenciesRepository.find();
    console.log("zzz", currencies);
    
    for (let currency of currencies) {
      if (currency.tokenAddresses) {
        const runExecuteRoundWorker = () => {
          console.log("333333");
          console.log(JSON.parse(currency.tokenAddresses));
          
          if (
            JSON.parse(currency.tokenAddresses)["predictionMarket"] &&
            JSON.parse(currency.tokenAddresses)["mockToken"]
          ) {
            console.log("zzzz2");
            
            new ExecuteRoundWorkerService(
              this.kmsService,
              this.notificationService,
              this.socketService,
              this.addressesService,
              this.latestBlockRepository,
              currency,
              this.roundOnchainRepository,
              this.betOnchainRepository,
              this.configRepository
            );
          }
        };

        this.runWorker(runExecuteRoundWorker);
      }
    }
  }

  runWorker(_cb: () => void) {
    try {
      _cb();
    } catch (error) {
      logger.error(error);
    }
  }
}
