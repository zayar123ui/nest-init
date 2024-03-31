//zayar
//03-30-2024
//custom exception handler
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const request = ctx.getRequest<Request>();
    // You can customize the response format and include additional information
    response.status(status).json({
      statusCode: status,
      ...(typeof exceptionResponse === "object"
        ? exceptionResponse
        : { response: exceptionResponse }),
      timestamp: new Date().toLocaleString(),
      path: ctx.getRequest().url,
      method: request.method
    });
  }
}