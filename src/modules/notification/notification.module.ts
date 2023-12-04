import { Module } from "@nestjs/common";
import { MailModule } from "../mail/mail.module";
import { NotificationService } from "./notification.service";
// import {TelegramService} from "./telegram.service";
// import {AuthModule} from '../admin/auth.module';
// import {NotificationController} from "./notification.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "../../database/entities";
import { JwtModule } from "@nestjs/jwt";
import { SocketService } from "../worker/socket.service";
import { S3Handler } from "../../shared/S3Handler";

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([Notification]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "abcxyz",
    }),
  ],
  providers: [NotificationService, SocketService, S3Handler],
  // controller: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
