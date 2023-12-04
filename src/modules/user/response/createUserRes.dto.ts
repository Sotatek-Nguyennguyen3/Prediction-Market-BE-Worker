import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRes {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: "0x0000000000000000000000000000000000000000",
  })
  wallet: string;

  @ApiProperty({
    type: Number,
    example: "3",
  })
  nonce: number;
}
