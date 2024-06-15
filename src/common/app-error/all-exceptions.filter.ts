import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { LoggerService } from '@nestjs/common'
import * as process from 'process'

interface IAllExceptionsFilter {
  logger: LoggerService,
  notImportantStatuses?: Array<number>,
  loggingForStage?: Array<string> // 'dev', 'local'
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private notImportantStatuses
  private loggingForStage
  private logger

  constructor (options?: IAllExceptionsFilter) {
    this.notImportantStatuses = options?.notImportantStatuses
    this.loggingForStage = options?.loggingForStage
    this.logger = options.logger
  }

  catch (exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    exception.req = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
      currentUser: request.currentUser,
      ip: request.ip,
      method: request.method,
      url: request.url,
    }

    const { status } = exception
    const isImportantStatuses = !this.notImportantStatuses?.includes(status)
    if (isImportantStatuses) {
      // log all except minor error
      this.logger.error(exception)
      this.logger.debug(exception.req)
    }

    const hasNodeEnvInOptions = this.loggingForStage && this.loggingForStage.length
    const logForStage = hasNodeEnvInOptions ? this.loggingForStage.includes(process.env.NODE_ENV) : true
    if (isImportantStatuses && logForStage && exception.stack) {
      console.log('--------------- ERROR STACK BEGIN --------------\n')
      console.log(`${new Date()}\n`)
      console.log(exception.stack)
      console.log('\n---------------- ERROR STACK END ---------------\n\n')
    }

    return response.status(status || 500).json({
      success: false,
      status,
      code: exception?.statusCode || undefined,
      message: exception?.message || undefined,
      errors: exception?.errors || undefined, // passed from global ValidationPipe
    })
  }
}
