import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AdminStatus } from "src/shared/enums";
import { Causes } from "../../../config/exception/causes";

export class UpdateStatus {
  @ApiProperty({
    type: Number,
    example: 1,
    description: "1 -> active; 2 -> in_active",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.STATUS_EMPTY) })
  @IsNumber({}, { message: JSON.stringify(Causes.STATUS_NUMBER) })
  @IsIn([AdminStatus.ACTIVE, AdminStatus.FREEZED], {
    message: JSON.stringify(Causes.STATUS_STRICT),
  })
  status: number;

  @ApiProperty({
    type: String,
    example: "test",
    description: "The reason to freeze/unfreeze this account",
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.REASON_EMPTY) })
  @IsString({ message: JSON.stringify(Causes.REASON_STRING) })
  reason: string;
}
