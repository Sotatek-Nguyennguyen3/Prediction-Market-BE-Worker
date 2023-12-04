import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNoti {
  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    example: "subject",
  })
  @IsString()
  subject: string;

  @ApiProperty({
    type: String,
    example: "content",
  })
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
    example: "link_view",
  })
  @IsString()
  linkView: string;

  @ApiProperty({
    type: Number,
    example: "status",
  })
  @IsString()
  status: number;

  @ApiProperty({
    type: Number,
    example: "sending_time",
  })
  @IsString()
  sendingTime: number;
}
