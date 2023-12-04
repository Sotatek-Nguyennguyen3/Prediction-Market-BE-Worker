import { BaseResponse } from "../../../shared/response/baseResponse.dto";
import { AdminLoginResponse } from "./login.dto";
import { ApiResponseProperty } from "@nestjs/swagger";

export class LoginBase extends BaseResponse {
  @ApiResponseProperty({
    type: AdminLoginResponse,
  })
  data: AdminLoginResponse;
}
