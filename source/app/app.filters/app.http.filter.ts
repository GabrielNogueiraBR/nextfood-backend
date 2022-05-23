import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { AppException, AppExceptionDetails, AppExceptionResponse } from '../app.interface';

@Catch(HttpException, Error)
export class AppHttpFilter implements ExceptionFilter {

  private logger = new Logger();
  private httpLogger = new Logger('HTTP');

  /**
   * Intercepts all errors and standardize the output.
   * @param exception
   * @param host
   */
  public catch(exception: HttpException | Error, host: ArgumentsHost): void {
    try {
      const appException: AppException = {
        exception,
        code: this.getCode(exception),
        message: this.getMessage(exception),
        details: this.getDetails(exception),
      };

      this.logException(appException, host);
      this.sendResponse(appException, host);
    } catch (e) {
      this.logger.error('Failed to handle exception', e as Error);
    }
  }

  /**
   * Given an exception, determines the correct status code.
   * @param exception
   */
  private getCode(exception: HttpException | Error): HttpStatus {
    return exception?.['getStatus']?.()
      || exception?.['statusCode']
      || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Given an exception, extracts a detailing message.
   * @param exception
   */
  private getMessage(exception: HttpException | Error): string {
    let message: any;

    if (exception instanceof HttpException) {
      const details = exception.getResponse() as Record<string, any>;
      const code = exception.getStatus();

      if (code === HttpStatus.BAD_REQUEST && !details?.outboundResponse) {
        message = 'request validation failed';
      } else if (details?.message && typeof details.message === 'string') {
        message = details.message;
      }
    } else {
      message = exception.message;
    }

    return message && typeof message === 'string'
      ? message
      : 'unexpected error';
  }

  /**
   * Given an exception, extracts its details.
   * @param exception
   */
  private getDetails(exception: HttpException | Error): AppExceptionDetails {
    let details: AppExceptionDetails;

    if (exception instanceof HttpException) {
      details = exception.getResponse() as Record<string, any>;
      const code = exception.getStatus();

      if (code === HttpStatus.BAD_REQUEST && !details?.outboundResponse) {
        const arrayConstraints = Array.isArray(details.message)
          ? details.message
          : [ details.message ];

        const uniqueConstraints = [ ...new Set(arrayConstraints) ];

        details = { constraints: uniqueConstraints };
      } else if (details && typeof details === 'object') {
        delete details.statusCode;
        delete details.message;
        delete details.error;
      }
    }

    return details || { };
  }

  /**
   * Logs the incident according to 'httpErrors'.
   * @param params
   * @param host
   */
  private logException(params: AppException, host: ArgumentsHost): void {
    const { details, exception, message, code } = params;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const inboundRequest = {
      method: request.method,
      host: request.hostname,
      path: request.path,
      params: request.params,
      query: request.query,
      body: request.body,
      headers: request.headers,
    };

    const data = { message, inboundRequest, ...details };

    return Object.values(HttpStatus).includes(code)
      ? this.logger.error(`${exception}\n${JSON.stringify(data)}`)
      : this.logger.log(`${exception}\n${JSON.stringify(data)}`);
  }

  /**
   * Send client response for given exception.
   * @param params
   * @param host
   */
  private sendResponse(params: AppException, host: ArgumentsHost): void {
    const { details, message, code } = params;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const isInternalError = code === HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: AppExceptionResponse = {
      code,
      message: isInternalError ? 'unexpected error' : message,
      ...details,
    };

    const exceptionBody = details?.outboundResponse?.body;

    const clientResponse: AppExceptionResponse = exceptionBody
      ? exceptionBody
      : exceptionResponse;

    this.httpLogger.log(`⯇ ${request.method} ${request.url}`, {
      code,
      body: clientResponse,
    });

    response.status(code);
    response.header('Content-Type', 'application/json');
    response.send(clientResponse);
  }

}
