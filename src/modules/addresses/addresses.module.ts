import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address, KmsDataKey, Config, Admin } from "../../database/entities";
import { AddressesController } from "./addresses.controller";
import { AddressesService } from "./addresses.service";
import { CommonModule } from "../common/common.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([KmsDataKey, Address, Config]),
    CommonModule,
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || "abcxyz",
    }),
  ],
  controllers: [AddressesController],
  exports: [TypeOrmModule, AddressesService],
  providers: [AddressesService],
})
export class AddressesModule {}
