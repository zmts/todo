import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepo } from './user.repo'


@Module({
  controllers: [UserController],
  imports: [],
  providers: [UserService, UserRepo],
  exports: [UserService]
})

export class UserModule {}
