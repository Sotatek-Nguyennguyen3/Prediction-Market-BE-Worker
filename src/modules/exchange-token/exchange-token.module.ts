import { Module } from "@nestjs/common";
import {
  TransactionLog,
  TransactionOnchain,
  TransactionRequest,
} from "../../database/entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "../common/common.module";
import { SocketService } from "../worker/socket.service";
// import {ExchangeTokenService} from "./exchange-token.service";
// import {ExchangeTokenController} from "./exchange-token.controller";
import { S3Handler } from "../../shared/S3Handler";
// import {GameServerService} from "./game-server.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionOnchain,
      TransactionLog,
      TransactionRequest,
    ]),
    CommonModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "abcxyz",
    }),
  ],
  providers: [
    SocketService,
    // ExchangeTokenService,
    // GameServerService,
    S3Handler,
  ],
  // controller: [ExchangeTokenController],
})
export class ExchangeTokenModule {}
