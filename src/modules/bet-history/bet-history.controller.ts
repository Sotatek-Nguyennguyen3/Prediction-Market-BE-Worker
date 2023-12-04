import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Query,
  Req,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { Causes } from "src/config/exception/causes";
import { BetHistoryService } from "./bet-history.service";

@Controller("bet-history")
export class BetHistoryController {
  constructor(private betHistoryService: BetHistoryService) {}

  @Get("list")
  @ApiOperation({
    tags: ["bet-history"],
    operationId: "list all histories of bet",
    summary: "list all histories of bet",
    description: "list all histories of bet",
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
  @ApiQuery({
    name: "status",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "claim",
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "roundEpoch",
    required: false,
    type: Number,
  })
  async listBetHistories(
    @Query("wallet") wallet: string,
    @Query("page", new DefaultValuePipe(1)) page: number,
    @Query("limit", new DefaultValuePipe(10)) limit: number,
    @Query("status") status: string,
    @Query("claim") claim: number,
    @Query("roundEpoch") roundEpoch: number
    // @Req() request: any
  ) {
    // if(!wallet) throw Causes.DATA_INVALID;
    let listBetHistory = await this.betHistoryService.listBetHistories(
      { wallet, status, claim, roundEpoch },
      { page, limit }
    );
    if (!listBetHistory) throw Causes.DATA_INVALID;
    return listBetHistory;
  }
}
