import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class EmailResetPassword {
  @ApiProperty({
    type: String,
    example: "tutheblue@gmail.com",
  })
  @IsOptional()
  @IsEmail({}, { message: JSON.stringify(Causes.EMAIL_INVALID) })
  email: string;
}
