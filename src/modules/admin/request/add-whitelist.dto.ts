import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class AddWhitelist {
  @ApiProperty({
    type: String,
    example: "wallet",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.WALLET_EMPTY) })
  @IsString({ message: JSON.stringify(Causes.WALLET_STRING) })
  @MinLength(6, { message: JSON.stringify(Causes.WALLET_MIN_LENGTH) })
  @MaxLength(100, { message: JSON.stringify(Causes.WALLET_MAX_LENGTH) })
  wallet: string;
}
