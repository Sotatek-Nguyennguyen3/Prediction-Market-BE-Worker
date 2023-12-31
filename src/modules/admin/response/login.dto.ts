import { ApiProperty } from "@nestjs/swagger";

export class AdminLoginResponse {
  @ApiProperty({
    type: String,
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haW5ndXllbiIsInBhc3N3b3JkIjoiMTIzIiwiaWF0IjoxNTg3NzI3NjE0fQ.V0cWJ_82CcakvCHfNbPLORJ6ShkGJyiC2H1jCQ5Z02s",
  })
  token: string;

  @ApiProperty({
    type: String,
    example: "tutheblue@gmail.com",
  })
  email: string;

  @ApiProperty({
    type: String,
    example: 1,
    description: "type: 1 <-> super admin; 2 <-> partnership",
  })
  type: number;
}
