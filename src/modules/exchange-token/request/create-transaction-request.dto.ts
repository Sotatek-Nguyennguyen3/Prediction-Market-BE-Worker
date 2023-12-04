import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class CreateTransactionRequest {
  @ApiProperty({
    type: "string",
    example: "97",
  })
  @IsString({ message: JSON.stringify(Causes.CHAIN_ID_STRING) })
  @IsNotEmpty({ message: JSON.stringify(Causes.CHAIN_ID_EMPTY) })
  chainId: string;

  @ApiProperty({
    type: String,
    example: "signature",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.SIGNATURE_EMPTY) })
  @IsString({ message: JSON.stringify(Causes.SIGNATURE_STRING) })
  @MinLength(6, { message: JSON.stringify(Causes.SIGNATURE_MIN_LENGTH) })
  @MaxLength(600, { message: JSON.stringify(Causes.SIGNATURE_MAX_LENGTH) })
  signature: string;

  @ApiProperty({
    type: String,
    example: "10000000000",
    description: "Amount of token to exchange (with decimals)",
  })
  @IsNumberString({
    message: JSON.stringify(Causes.EXCHANGE_AMOUNT_IS_NUMBER_STRING),
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.EXCHANGE_AMOUNT_IS_EMPTY) })
  amount: string;

  @ApiProperty({
    type: String,
    example: "123456",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.TWOFA_CODE_IS_EMPTY) })
  twofa: string;
}
