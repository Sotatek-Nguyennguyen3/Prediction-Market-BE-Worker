import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class AdminLogin {
  @ApiProperty({
    type: String,
    example: "tutheblue",
  })
  @IsOptional()
  @IsString({ message: JSON.stringify(Causes.USERNAME_STRING) })
  username: string;

  @ApiProperty({
    type: String,
    example: "tutheblue@gmail.com",
  })
  @IsOptional()
  @IsEmail({}, { message: JSON.stringify(Causes.EMAIL_INVALID) })
  email: string;

  @ApiProperty({
    type: String,
    example: "Tu@theblue",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.PASSWORD_EMPTY) })
  password: string;
}
