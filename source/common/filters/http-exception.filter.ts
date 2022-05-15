import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  private logger = new Logger('HTTP');

  /**
   * Catch http exceptions.
   * @param exception
   * @param host
   */
  public catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { method, url, body, query, params, headers, hostname, path } = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { message, stack } = exception;

    const inboundRequest = {
      host: hostname,
      path: path,
      params: params,
      query: query,
      body: body,
      headers: headers,
    };

    const data = { message, inboundRequest, stack };

    this.logger.error(`⯇ ${status} | ${method} ${url} ${JSON.stringify(data, null, 2)}`);

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: url,
      });
  }

}
