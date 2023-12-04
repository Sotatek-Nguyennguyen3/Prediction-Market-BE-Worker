import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetOnchain, RoundOnchain } from "src/database/entities";
import { RoundOnChainController } from "./round-on-chain.controller";
import { RoundOnChainService } from "./round-on-chain.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoundOnchain, BetOnchain])],
  providers: [RoundOnChainService],
  controllers: [RoundOnChainController],
})
export class RoundOnChainModule {}
