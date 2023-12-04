import { ApiProperty } from "@nestjs/swagger";

export class GetRoundStatistic {
  @ApiProperty({
    type: Number,
  })
  totalRound: number;

  @ApiProperty({
    type: Number,
  })
  totalRoundSuccess: number;

  @ApiProperty({
    type: Number,
  })
  totalIncome: number;

  @ApiProperty({
    type: Number,
  })
  totalWinRound: number;

  @ApiProperty({
    type: Number,
  })
  totalWinToken: number;

  @ApiProperty({
    type: Number,
  })
  totalLoseRound: number;

  @ApiProperty({
    type: Number,
  })
  totalLoseToken: number;

  @ApiProperty({
    type: Number,
  })
  averageEnterPerRound: number;

  @ApiProperty({
    type: Number,
  })
  averageReturnPerRound: number;

  @ApiProperty({
    type: Number,
  })
  bestMoney: number;

  @ApiProperty({
    type: Number,
  })
  bestEpoch: number;
}
