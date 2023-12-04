import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Causes } from "../../../config/exception/causes";

export class Update {
  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsNotEmpty({ message: JSON.stringify(Causes.NOTI_ID_EMPTY) })
  id: number;
}
