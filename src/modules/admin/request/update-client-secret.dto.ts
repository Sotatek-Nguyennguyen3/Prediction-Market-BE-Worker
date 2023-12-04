import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class UpdateClientSecret {
  @ApiProperty({
    type: String,
    example: "password",
  })
  @IsString({ message: JSON.stringify(Causes.CLIENT_SECRET_STRING) })
  @IsOptional()
  @MinLength(20, { message: JSON.stringify(Causes.CLIENT_SECRET_MIN_LENGTH) })
  @MaxLength(255, { message: JSON.stringify(Causes.CLIENT_SECRET_MAX_LENGTH) })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: JSON.stringify(Causes.CLIENT_SECRET_MATCH_PATTERN),
  })
  newClientSecret: string;
}
