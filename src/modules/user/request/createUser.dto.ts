import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class CreateUser {
  @ApiProperty({
    type: String,
  })
  // @IsNumber({}, {message: JSON.stringify(Causes.NONCE_NUMBER)})
  // @Matches(/^[1-9]\d*$/, {message: JSON.stringify(Causes.NONCE_MATCH_PATTERN)})
  signature: string;

  @ApiProperty({
    type: String,
    example: "0x0000000000000000000000000000000000000000",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.WALLET_EMPTY) })
  @IsString({ message: JSON.stringify(Causes.WALLET_STRING) })
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: JSON.stringify(Causes.PASSWORD_MATCH_PATTERN),
  })
  wallet: string;
}
