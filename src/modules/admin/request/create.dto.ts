import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class CreateAdmin {
  @ApiProperty({
    type: String,
    example: "example@gmail.com",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.EMAIL_EMPTY) })
  @IsEmail({}, { message: JSON.stringify(Causes.EMAIL_INVALID) })
  @MaxLength(256, { message: JSON.stringify(Causes.EMAIL_TOO_LONG) })
  email: string;

  @ApiProperty({
    type: String,
    example: "username",
  })
  @IsOptional()
  @IsString({ message: JSON.stringify(Causes.USERNAME_STRING) })
  @MinLength(3, { message: JSON.stringify(Causes.USERNAME_MIN_LENGTH) })
  @MaxLength(256, { message: JSON.stringify(Causes.USERNAME_MAX_LENGTH) })
  username: string;

  @ApiProperty({
    type: String,
    example: "full_name",
  })
  @IsString({ message: JSON.stringify(Causes.FULL_NAME_STING) })
  @MinLength(4, { message: JSON.stringify(Causes.FULL_NAME_MIN_LENGTH) })
  @MaxLength(64, { message: JSON.stringify(Causes.FULL_NAME_MAX_LENGTH) })
  fullName: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber({}, { message: JSON.stringify(Causes.TYPE_NUMBER) })
  @IsIn([1, 2], { message: JSON.stringify(Causes.TYPE_STRICT) })
  type: number;

  @ApiProperty({
    type: String,
    example: "password",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.PASSWORD_EMPTY) })
  @IsString({ message: JSON.stringify(Causes.PASSWORD_STRING) })
  @MinLength(8, { message: JSON.stringify(Causes.PASSWORD_MIN_LENGTH) })
  @MaxLength(20, { message: JSON.stringify(Causes.PASSWORD_MAX_LENGTH) })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: JSON.stringify(Causes.PASSWORD_MATCH_PATTERN),
  })
  password: string;

  @ApiProperty({
    type: String,
    example: "username@client_id",
  })
  @IsString({ message: JSON.stringify(Causes.CLIENT_ID_STRING) })
  @IsOptional()
  @MinLength(3, { message: JSON.stringify(Causes.CLIENT_ID_MIN_LENGTH) })
  @MaxLength(40, { message: JSON.stringify(Causes.CLIENT_ID_MAX_LENGTH) })
  @Matches(/^[a-z0-9-_]{3,40}$/i, {
    message: JSON.stringify(Causes.CLIENT_ID_MATCH_PATTERN),
  })
  clientId: string;

  @ApiProperty({
    type: String,
    example: "username@client_secret",
  })
  @IsString({ message: JSON.stringify(Causes.CLIENT_SECRET_STRING) })
  @IsOptional()
  @MinLength(20, { message: JSON.stringify(Causes.CLIENT_SECRET_MIN_LENGTH) })
  @MaxLength(255, { message: JSON.stringify(Causes.CLIENT_SECRET_MAX_LENGTH) })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: JSON.stringify(Causes.CLIENT_SECRET_MATCH_PATTERN),
  })
  clientSecret: string;
}
