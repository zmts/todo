import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthMiddleware } from './middlewares/auth.middleware'
import { pgConfig } from './config/database/pg/pg.config'
import { UserModule } from './user/user.module'
import { PostsModule } from './posts/posts.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostsModule,
    TypeOrmModule.forRootAsync({
      useFactory () {
        return pgConfig.getTypeOrmConfig()
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}
