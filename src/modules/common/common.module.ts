import { HttpModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CurrencyRegistryService } from "./currency.service";
import { BlockchainService } from "./blockchain.service";
import { KmsService } from "./kms.service";
import {
  Address,
  CurrencyConfig,
  KmsCmk,
  KmsDataKey,
} from "../../database/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrencyConfig, KmsCmk, KmsDataKey, Address]),
    HttpModule,
  ],
  exports: [
    TypeOrmModule,
    CurrencyRegistryService,
    BlockchainService,
    KmsService,
  ],
  providers: [CurrencyRegistryService, BlockchainService, KmsService],
})
export class CommonModule {}
