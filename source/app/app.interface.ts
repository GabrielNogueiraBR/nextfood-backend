import { HttpException, HttpStatus } from '@nestjs/common';

export interface AppException {
  exception: HttpException | Error;
  code: HttpStatus;
  message: string;
  details?: AppExceptionDetails;
}

export interface AppExceptionDetails extends Record<string, any> {
  outboundResponse?: Record<string, any>;
  outboundRequest?: Record<string, any>;
  constraints?: string[];
}

export interface AppExceptionResponse extends Record<string, any> {
  code: number;
  message: string;
}
