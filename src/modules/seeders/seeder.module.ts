import { Logger, Module } from "@nestjs/common";
import { Seeder } from "./seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "../../config/database.config";
import { SeedService } from "./seed.service";
import {
  Admin,
  CurrencyConfig,
  CurrencyToken,
  KmsCmk,
} from "../../database/entities";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Admin, CurrencyConfig, CurrencyToken, KmsCmk]),
  ],
  providers: [Logger, Seeder, SeedService],
})
export class SeederModule {}
