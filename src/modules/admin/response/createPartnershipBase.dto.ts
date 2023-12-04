import { BaseResponse } from "../../../shared/response/baseResponse.dto";
import { CreatePartnershipRes } from "./createPartnership.dto";
import { ApiResponseProperty } from "@nestjs/swagger";

export class RegisterBase extends BaseResponse {
  @ApiResponseProperty({
    type: CreatePartnershipRes,
  })
  data: CreatePartnershipRes;
}
