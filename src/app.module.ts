import {
  CacheModule,
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
} from "@nestjs/common";
import type { ClientOpts } from "redis";
import { RedisClient } from "redis";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { databaseConfig } from "./config/database.config";
// import {AuthModule} from './modules/admin/auth.module';
import { CommonModule } from "./modules/common/common.module";
import { TransformInterceptor } from "./config/rest/transform.interceptor";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ExceptionFilter } from "./config/exception/exception.filter";
// import {NotificationModule} from './modules/notification/notification.module';
// import {ApiV1Module} from './modules/api-v1/api-v1.module';
import { CurrencyTokenModule } from "./modules/currency-token/currencyToken.module";
import { ExchangeTokenModule } from "./modules/exchange-token/exchange-token.module";
import { AddressesModule } from "./modules/addresses/addresses.module";
import { BetHistoryModule } from "./modules/bet-history/bet-history.module";
import { RoundOnChainModule } from "./modules/round-on-chain/round-on-chain.module";
import { AuthModule } from "./modules/user/auth.module";

const session = require("express-session");
// let RedisStore = require("connect-redis")(session);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    AddressesModule,
    AuthModule,
    CommonModule,
    // NotificationModule,
    // ApiV1Module,
    CurrencyTokenModule,
    ExchangeTokenModule,
    BetHistoryModule,
    RoundOnChainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    Logger,
  ],
})
export class AppModule {
  constructor() {}
}
