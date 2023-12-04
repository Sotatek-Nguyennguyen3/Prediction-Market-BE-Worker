// import {Body, Controller, Get, HttpStatus, Param, Post, Query, Req, UseGuards} from "@nestjs/common";
// import {ExchangeTokenService} from "./exchange-token.service";
// import {JwtAuthGuard} from "../user/jwt-auth.guard";
// import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
// import {CreateTransactionRequest} from "./request/create-transaction-request.dto";
// import RequestWithUser from "../user/requestWithUser.interface";
// import {Causes} from "../../config/exception/causes";
// import {TwoFactorAuthenticationService} from "../user/twoFactorAuthentication.service";

// @Controller('exchange-token')
// export class ExchangeTokenController {
//     constructor(
//         private readonly exchangeTokenService: ExchangeTokenService,
//         private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
//     ) {}

//     @Get('/transactions/list')
//     @ApiOperation({
//         tags: ['exchange-token'],
//         operationId: 'getTransactions',
//         summary: 'Get all transactions',
//         description: 'Get all transactions',
//     })
//     @UseGuards(JwtAuthGuard)
//     @ApiResponse({
//         status: HttpStatus.OK,
//         description: "Successful",

//     })
//     @ApiQuery({
//         name: "page",
//         required: true,
//         type: Number,
//     })
//     @ApiQuery({
//         name: "limit",
//         required: true,
//         type: Number,
//     })
//     @ApiQuery({
//         name: "status",
//         required: false,
//         type: String,
//         description: "pending || processing || processed || success || failed"
//     })
//     @ApiQuery({
//         name: "type",
//         required: false,
//         type: String,
//         description: "on_to_off || off_to_on"
//     })
//     @ApiQuery({
//         name: "chainId",
//         required: false,
//         type: String,
//     })
//     async getListTransaction(
//         @Query('page') page: number,
//         @Query('limit') limit: number,
//         @Query('status') status: string,
//         @Query('type') type: string,
//         @Query('chainId') chainId: string,
//         @Req() req: RequestWithUser
//     ) {
//         const user = req.user;

//         const transactionRequest = await this.exchangeTokenService.getListTransactionRequest({status, type, chainId}, {page, limit}, user);

//         if (!transactionRequest) {
//             throw Causes.DATA_INVALID;
//         }

//         return transactionRequest;
//     }

//     @Get('/transactions/:id')
//     @ApiOperation({
//         tags: ['exchange-token'],
//         operationId: 'getTransaction',
//         summary: 'Get a exchange-token',
//         description: 'Get a exchange-token by id',
//     })
//     @UseGuards(JwtAuthGuard)
//     @ApiResponse({
//         status: HttpStatus.OK,
//         description: "Successful",

//     })
//     async getTransaction(@Param('id') id: string, @Req() req: RequestWithUser) {
//         const user = req.user;

//         const transactionRequest = await this.exchangeTokenService.getTransaction(id, user);

//         if (!transactionRequest) {
//             throw Causes.TRANSACTION_NOT_FOUND;
//         }

//         return transactionRequest;
//     }

//     @Post('/transactions/create')
//     @ApiOperation({
//         tags: ['exchange-token'],
//         operationId: 'createTransaction',
//         summary: 'Create a exchange-token',
//         description: 'Create a exchange-token',
//     })
//     @UseGuards(JwtAuthGuard)
//     @ApiResponse({
//         status: HttpStatus.OK,
//         description: "Successful",
//     })
//     async createTransaction(
//         @Body() transaction: CreateTransactionRequest,
//         @Req() req: RequestWithUser
//     ) {
//         const user = req.user;

//         const transactionRequest = await this.exchangeTokenService.createTransactionRequest(transaction, user);

//         if (!transactionRequest) {
//             throw Causes.DATA_INVALID;
//         }

//         return transactionRequest;
//     }

//     @Get('/notifications/list')
//     @ApiOperation({
//         tags: ['exchange-token'],
//         operationId: 'getNotifications',
//         summary: 'Get all notifications',
//         description: 'Get all notifications',
//     })
//     @UseGuards(JwtAuthGuard)
//     @ApiResponse({
//         status: HttpStatus.OK,
//         description: "Successful",

//     })
//     //TODO: add more params
//     async getAllNotification() {
//         //TODO: implement this
//     }
// }
