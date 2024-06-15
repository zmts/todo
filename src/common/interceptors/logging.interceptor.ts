import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor (private readonly logger: Logger) {}

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const req = context.switchToHttp().getRequest()
    const { method, url } = req

    return next
      .handle()
      .pipe(tap(() => this.logger.debug(`${method}${url}: ${Date.now() - now}ms`)),)
  }
}
