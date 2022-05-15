/* eslint-disable @typescript-eslint/naming-convention */
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {

  private logger = new Logger('HTTP');

  /**
   * Log all inbound HTTP requests.
   * @param context
   * @param next
   */
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const { method, url } = context.switchToHttp().getRequest<Request>();

    this.logger.log(`⯈ ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap(() => {
          const { statusCode } = context.switchToHttp().getResponse();
          const delay = Date.now() - now;

          this.logger.log(`⯇ ${statusCode} | ${method} ${url} - ${delay}ms`);
        }),
      );
  }

}
