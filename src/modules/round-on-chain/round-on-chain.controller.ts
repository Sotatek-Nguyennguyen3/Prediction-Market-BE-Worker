import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { Causes } from "src/config/exception/causes";
import { RoundOnChainService } from "./round-on-chain.service";

@Controller("round-onchain")
export class RoundOnChainController {
  constructor(private RoundOnChainService: RoundOnChainService) {}

  @Get("list")
  @ApiOperation({
    tags: ["round-onchain"],
    operationId: "list rounds",
    summary: "list rounds",
    description: "list rounds",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
  })
  @ApiQuery({
    name: "wallet",
    required: false,
    type: String,
  })
  async listRounds(@Query("wallet") wallet: string) {
    let listRoundOnChain = await this.RoundOnChainService.listRounds(wallet);
    if (!listRoundOnChain) throw Causes.DATA_INVALID;
    return listRoundOnChain;
  }

  @Get("current-epoch")
  @ApiOperation({
    tags: ["round-onchain"],
    operationId: "get current epoch",
    summary: "get current epoch",
    description: "get current epoch",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
  })
  async currentEpoch() {
    return await this.RoundOnChainService.currentEpoch();
  }

  @Get("time-current-epoch")
  @ApiOperation({
    tags: ["round-onchain"],
    operationId: "get remain time of current epoch",
    summary: "get remain time of current epoch",
    description: "get remain time of current epoch",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
  })
  async timeCurrentEpoch() {
    return await this.RoundOnChainService.timeCurrentEpoch();
  }

  @Get("current-price")
  @ApiOperation({
    tags: ["round-onchain"],
    operationId: "get current price of token",
    summary: "get current price of token",
    description: "get current price of token",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
  })
  async currentPrice() {
    return await this.RoundOnChainService.currentPrice();
  }
}
