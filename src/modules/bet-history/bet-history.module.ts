import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetOnchain } from "src/database/entities";
import { BetHistoryController } from "./bet-history.controller";
import { BetHistoryService } from "./bet-history.service";

@Module({
  imports: [TypeOrmModule.forFeature([BetOnchain])],
  providers: [BetHistoryService],
  controllers: [BetHistoryController],
})
export class BetHistoryModule {}
