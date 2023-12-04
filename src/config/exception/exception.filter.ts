import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as ExceptionFilterBase,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { EmptyObject } from "../../shared/response/emptyObject.dto";
import { getLogger } from "../../shared/logger";
import { isJsonString } from "../../shared/Utils";

const logger = getLogger("Exceptionfilter");

@Catch()
export class ExceptionFilter<T> implements ExceptionFilterBase {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // log data
    logger.error(`Body: ${JSON.stringify(request.body)}`);
    logger.error(`Query: ${JSON.stringify(request.query)}`);
    logger.error(`Params: ${JSON.stringify(request.params)}`);
    logger.error(exception);

    let error_code;
    let dynamic_data;
    let message: any;
    if (exception instanceof HttpException) {
      message = exception.getResponse();
      error_code = "UNKNOWN";
    } else {
      message = "Internal server error";
      error_code = "INTERNAL";
    }

    if (typeof message == "object") {
      //Just handle the first error message
      if (
        message.message &&
        isJsonString(message.message[0]) &&
        typeof JSON.parse(message.message[0]) == "object"
      ) {
        const dto_message = JSON.parse(message.message[0]);
        error_code = dto_message.error_code;
        message = dto_message.message;
        dynamic_data = dto_message.dynamic_data || {};
      } else {
        error_code = message.error_code || "UNKNOWN";
        dynamic_data = message.dynamic_data || {};
        message = message.message ? message.message : message.error || message;
      }
    }

    if (
      isJsonString(exception.message) &&
      typeof JSON.parse(exception.message) == "object"
    ) {
      const e_message = JSON.parse(exception.message);
      error_code = e_message.response.error_code || "UNKNOWN";
      message = e_message.message
        ? e_message.message
        : e_message.error || e_message;
      dynamic_data = e_message.response.dynamic_data || {};
    }

    response.status(status).json({
      meta: {
        code: status,
        message,
        error_code,
        dynamic_data,
      },
      data: new EmptyObject(),
    });
  }
}
