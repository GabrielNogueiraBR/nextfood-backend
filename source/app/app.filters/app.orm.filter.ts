import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

import { AppException, AppExceptionResponse } from '../app.interface';

@Catch(TypeORMError)
export class AppOrmFilter implements ExceptionFilter {

  private logger = new Logger();
  private httpLogger = new Logger('HTTP');

  /**
   * Intercepts all errors and standardize the output.
   * @param exception
   * @param host
   */
  public catch(exception: TypeORMError | Error, host: ArgumentsHost): void {
    try {
      let appException: AppException;

      switch (exception.constructor) {
        case QueryFailedError:
          appException = {
            exception,
            code: HttpStatus.UNPROCESSABLE_ENTITY,
            message: (exception as QueryFailedError).message,
          };
          break;
        case EntityNotFoundError:
          appException = {
            exception,
            code: HttpStatus.NOT_FOUND,
            message: (exception as EntityNotFoundError).message,
          } as any;
          break;
        case CannotCreateEntityIdMapError:
          appException = {
            exception,
            code: HttpStatus.UNPROCESSABLE_ENTITY,
            message: (exception as CannotCreateEntityIdMapError).message,
          };
          break;
        default:
          appException = {
            exception,
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message,
          };
      }

      this.logException(appException, host);
      this.sendResponse(appException, host);
    } catch (e) {
      this.logger.error('Failed to handle exception', e as Error);
    }
  }

  /**
   * Logs the incident according to 'httpErrors'.
   * @param params
   * @param host
   */
  private logException(params: AppException, host: ArgumentsHost): void {
    const { details, exception, message } = params;
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

    return this.logger.error(`${exception}\n${JSON.stringify(data)}`);
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
