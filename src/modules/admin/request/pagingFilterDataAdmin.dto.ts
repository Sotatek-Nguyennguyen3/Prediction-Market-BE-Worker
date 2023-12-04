import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class PagingFilterDataAdmin {
  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(150)
  limit: number;

  @ApiProperty({ example: [0, 8], required: false })
  @IsOptional()
  @IsArray()
  sort: Sort[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  isActive: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  group: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email: string;
}

export enum Sort {
  NONE,
  FULLNAME_DESC,
  FULLNAME_ASC,
  USERNAME_DESC,
  USERNAME_ASC,
  EMAIL_DESC,
  EMAIL_ASC,
  GROUP_DESC,
  GROUP_ASC,
  UPDATEAT_DESC,
  UPDATEAT_ASC,
}
