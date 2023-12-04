import { HttpException } from "@nestjs/common";

/**
 * Defines the Json Nest HTTP exception with error code
 * Exceptions Handler.
 *
 */
export class JsonException extends HttpException {
  constructor(
    message: string | object | any,
    http_status: number,
    error_code: string,
    dynamic_data = null
  ) {
    super(
      {
        message,
        error_code,
        dynamic_data,
      },
      http_status
    );
  }
}
