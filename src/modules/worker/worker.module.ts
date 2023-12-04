import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Address,
  BetOnchain,
  Config,
  LatestBlock,
  Notification,
  RoundOnchain,
  SocketNotification,
  TransactionLog,
  TransactionOnchain,
  TransactionRequest,
  User,
} from "../../database/entities";
import { CommonModule } from "../common/common.module";
import { ScheduleModule } from "@nestjs/schedule";
import { WorkerManagerService } from "./worker-manager.service";
import { NotificationModule } from "../notification/notification.module";
import { SocketService } from "./socket.service";
import { NotificationService } from "../notification/notification.service";
import { MailService } from "../mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { S3Handler } from "src/shared/S3Handler";
import { AddressesService } from "../addresses/addresses.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LatestBlock,
      Notification,
      TransactionRequest,
      TransactionOnchain,
      TransactionLog,
      SocketNotification,
      Address,
      RoundOnchain,
      BetOnchain,
      Config,
    ]),
    CommonModule,
    NotificationModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  exports: [TypeOrmModule, WorkerManagerService],
  providers: [
    WorkerManagerService,
    AddressesService,
    MailService,
    SocketService,
    NotificationService,
    JwtService,
    S3Handler,
  ],
})
export class WorkerModule {}
