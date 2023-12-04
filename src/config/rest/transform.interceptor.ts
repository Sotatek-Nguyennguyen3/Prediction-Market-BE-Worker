import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getLogger } from "../../shared/logger";
import { Response } from "./response";

const logger = getLogger("Response");
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const { statusCode } = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) =>
        // logger.info(`API Response Status Code: ${statusCode}`),
        ({
          meta: {
            code: context.switchToHttp().getResponse().statusCode,
            message: data.message ? data.message : "Successful",
            error_code: data.error_code,
            pagination: data.pagination,
          },
          summary: data.summary,
          data: data.results ? data.results : data,
        })
      )
    );
  }
}
