import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { AppError } from './common/app-error/app-error'
import { AllExceptionsFilter } from './common/app-error/all-exceptions.filter'
import { VALIDATION } from './common/app-error/error-codes'
import { appConfig } from './config/app/app.config'
import { pgConfig } from './config/database/pg/pg.config'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

function configLog (logger: Logger) {
  logger.log('----------')
  logger.log(`NODE_ENV: ${process.env.NODE_ENV}`)
  logger.log(`DB_HOST: ${pgConfig.getTypeOrmConfig().host}`)
  logger.log(`DB_PORT: ${pgConfig.getTypeOrmConfig().port}`)
  logger.log(`DB_NAME: ${pgConfig.getTypeOrmConfig().database}`)
  logger.log(`DB_USER: ${pgConfig.getTypeOrmConfig().username}`)
  logger.log(`APP IS RUNNING ON: ${appConfig.appPort} PORT`)
  logger.log('----------')
}


const appConfigurator = (app: INestApplication, logger: Logger) => {
  app.enableCors()
  app.useGlobalFilters(new AllExceptionsFilter({ logger, notImportantStatuses: [409] }))
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        throw new AppError({ ...VALIDATION, errors })
      },
      stopAtFirstError: true,
      validationError: {
        value: true,
        target: false,
      },
    }),
  )
  app.useGlobalInterceptors(new LoggingInterceptor(logger))
}

async function bootstrap () {
  if (!appConfig.validEnvs.includes(process.env.NODE_ENV)) {
    throw new Error(`Invalid NODE_ENV: ${process.env.NODE_ENV}`)
  }
  const logger = new Logger(appConfig.appName)
  const app = await NestFactory.create(AppModule, { logger })
  appConfigurator(app, logger)

  await app.listen(appConfig.appPort)
  configLog(logger)
}

bootstrap()
