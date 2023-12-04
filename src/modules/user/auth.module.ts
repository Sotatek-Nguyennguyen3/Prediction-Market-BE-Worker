import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthService as AuthUserService } from "../user/auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Address,
  Admin,
  BetOnchain,
  CurrencyConfig,
  KmsCmk,
  KmsDataKey,
  RoundOnchain,
  User,
} from "../../database/entities";
import { MailService } from "../mail/mail.service";
import { S3Handler } from "../../shared/S3Handler";
import { KmsService } from "../common/kms.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      User,
      BetOnchain,
      RoundOnchain,
      CurrencyConfig,
      Address,
      KmsCmk,
      KmsDataKey,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "abcxyz",
      // signOptions: { expiresIn: 24 * 60 * 60 },
    }),
  ],
  providers: [
    AuthService,
    AuthUserService,
    S3Handler,
    KmsService,
    CurrencyConfig,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
