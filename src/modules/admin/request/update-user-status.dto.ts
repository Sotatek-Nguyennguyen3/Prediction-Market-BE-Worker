import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class UpdateUserStatus {
  @ApiProperty({
    type: String,
    example: "inactive",
    description: "active -> add blacklist; inactive -> remove blacklist",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.STATUS_EMPTY) })
  @IsString({ message: JSON.stringify(Causes.ADMIN_STATUS_STRING) })
  @IsIn(["active", "inactive"], {
    message: JSON.stringify(Causes.ADMIN_STATUS_STRICT),
  })
  status: string;

  @ApiProperty({
    type: String,
    example: "test",
    description: "The reason to add/remove blacklist this account",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.REASON_EMPTY) })
  @IsString({ message: JSON.stringify(Causes.REASON_STRING) })
  reason: string;
}
