import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CurrencyConfig, CurrencyToken } from "src/database/entities";
import { CurrencyTokenController } from "./currencyToken.controller";
import { CurrencyTokenService } from "./currencyToken.service";

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyToken, CurrencyConfig])],
  providers: [CurrencyTokenService],
  controllers: [CurrencyTokenController],
})
export class CurrencyTokenModule {}
