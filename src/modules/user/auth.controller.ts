import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EmptyObject } from "../../shared/response/emptyObject.dto";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { Causes } from "../../config/exception/causes";
import RequestWithUser from "./requestWithUser.interface";
import { MailService } from "../mail/mail.service";
import { CreateUser } from "./request/createUser.dto";
import { claimReward } from "./request/claimReward.dto";
import { CreateUserRes } from "./response/createUserRes.dto";
import { BaseResponse } from "src/shared/response/baseResponse.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BetOnchain, User } from "src/database/entities";
import { Repository } from "typeorm";
import { GetRoundStatistic } from "./response/getRoundStatistic";
import { query } from "express";
import { Wallet } from "ethers";
import { SignatureBet } from "./request/signatureBet.dto";

@Controller("user")
export class AuthController {
  constructor(
    @InjectRepository(BetOnchain)
    private betOnchainRepository: Repository<BetOnchain>,

    private authService: AuthService
  ) {}

  @Get("get-nonce")
  async getNonce(@Query("address") address: string) {
    return this.authService.updateNonce(address);
  }

  @Post("/")
  @ApiOperation({
    tags: ["auth-user"],
    operationId: "Create new user",
    summary: "Create new user, including wallet address and nonce",
    description: "Create new user, including wallet address and nonce",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
    type: BaseResponse,
  })
  async createUser(
    @Body() data: CreateUser
    // @Req() request: RequestWithUser
  ): Promise<CreateUserRes | EmptyObject> {
    // if (!request) throw HttpStatus.BAD_REQUEST;
    const duplicatedUser = await this.authService.checkDuplicatedUser(data);
    if (duplicatedUser.length) {
      throw Causes.DUPLICATED_ACCOUNT;
    }
    const user = await this.authService.registerUser(data);
    return user;
  }

  @Get("/round-statistic/:wallet")
  @ApiOperation({
    tags: ["round-statistic"],
    operationId: "Get user's round statistic",
    summary: "Get user's round statistic",
    description: "Get user's round statistic",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
    type: BaseResponse,
  })
  async getUserRoundStatistic(
    @Param("wallet") wallet: string
  ): Promise<GetRoundStatistic | EmptyObject> {
    let roundStatistic = await this.authService.getRoundStatistic(wallet);
    if (!roundStatistic) throw Causes.DATA_INVALID;
    return roundStatistic;
  }

  @Post("/signature")
  @ApiOperation({
    tags: ["bet"],
    operationId: "user bet up bet down",
    summary: "user bet up bet down",
    description: "user bet up bet down",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
  })
  async getSignature(
    @Body() data: SignatureBet
    // @Req() request: RequestWithUser
  ) {
    const betSignature = await this.authService.signatureBet(data);

    if (!betSignature) throw Causes.DATA_INVALID;

    return betSignature;
  }
}
