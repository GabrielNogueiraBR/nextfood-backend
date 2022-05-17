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
    const ctx = context.switchToHttp();
    const now = Date.now();
    const { method, url, body, headers } = ctx.getRequest<Request>();

    const inboundRequest = {
      body: body,
      headers: headers,
    };

    this.logger.log(`⯈ ${method} ${url} ${JSON.stringify(inboundRequest, null, 2)}`);

    return next
      .handle()
      .pipe(
        tap(() => {
          // eslint-disable-next-line @typescript-eslint/unbound-method
          const { statusCode, body } = ctx.getResponse();
          const delay = Date.now() - now;

          this.logger.log(`⯇ ${statusCode} | ${method} ${url} ${body} - ${delay}ms`);
        }),
      );
  }

}
