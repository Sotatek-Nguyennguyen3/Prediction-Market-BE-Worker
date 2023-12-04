import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class UpdateEmailPartnerShip {
  @ApiProperty({
    type: String,
    example: "tutheblue+1@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail({}, { message: JSON.stringify(Causes.EMAIL_INVALID) })
  newEmail: string;
}
