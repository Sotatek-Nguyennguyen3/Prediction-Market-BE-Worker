import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { Causes } from "src/config/exception/causes";
import { CurrencyTokenService } from "./currencyToken.service";

@Controller("currency-token")
export class CurrencyTokenController {
  constructor(private currencyTokenService: CurrencyTokenService) {}

  @Get("list-all")
  @ApiOperation({
    tags: ["currency-token"],
    operationId: "list all currency token",
    summary: "list all currency token",
    description: "list all currency token",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
  })
  async listAllCurrencyTokens() {
    let listCurrencyToken =
      await this.currencyTokenService.listAllCurrencyTokens();
    if (!listCurrencyToken) throw Causes.DATA_INVALID;
    return listCurrencyToken;
  }

  @Get("list")
  @ApiOperation({
    tags: ["currency-token"],
    operationId: "list currency token",
    summary: "list currency token",
    description: "list currency token",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successful",
  })
  @ApiQuery({ name: "network", type: "string", required: false })
  @ApiQuery({ name: "chainName", type: "string", required: false })
  @ApiQuery({ name: "chainId", type: "string", required: false })
  @ApiQuery({ name: "status", type: "number", required: false })
  @ApiQuery({ name: "contract_address", type: "string", required: false })
  @ApiQuery({
    name: "isNativeToken",
    type: "boolean",
    enum: [1, 0],
    required: false,
  })
  @ApiQuery({ name: "tokenName", type: "string", required: false })
  @ApiQuery({ name: "decimal", type: "number", required: false })
  async listCurrencyTokens(
    @Query("network") network: string,
    @Query("chainName") chainName: string,
    @Query("chainId") chainId: string,
    @Query("status") status: number,
    @Query("contract_address") contract_address: string,
    @Query("isNativeToken") isNativeToken: boolean,
    @Query("tokenName") tokenName: string,
    @Query("decimal") decimal: number
  ) {
    let listCurrencyToken = await this.currencyTokenService.listCurrencyToken(
      network,
      contract_address,
      chainName,
      chainId,
      status,
      isNativeToken,
      tokenName,
      decimal
    );
    if (!listCurrencyToken) throw Causes.DATA_INVALID;
    return listCurrencyToken;
  }
}
