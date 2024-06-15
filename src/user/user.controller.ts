import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  UseGuards
} from '@nestjs/common'

import { UserService } from './user.service'
import { UserRegistrationDto } from './dto/user-registration.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import { AuthGuard } from '../common/guards/auth.guard'
import { ICurrentUserContext } from '../common/interfaces/current-user.interface'
import { CurrentUserContext } from '../common/decorators/current-user-context.decorator'

@Controller('users')
export class UserController {
  constructor (
    private usersService: UserService
  ) {}

  @Get('current')
  @UseGuards(AuthGuard)
  getCurrentUser (@CurrentUserContext() currentUser: ICurrentUserContext) {
    return this.usersService.getUser(currentUser.id)
  }

  @Patch()
  @UseGuards(AuthGuard)
  updateCurrentUser (
    @Body() userData: UserUpdateDto,
    @CurrentUserContext() currentUser: ICurrentUserContext
  ) {
    return this.usersService.updateUser({ ...userData, id: currentUser.id })
  }

  @Post()
  newUser (@Body() userData: UserRegistrationDto) {
    return this.usersService.createUser(userData)
  }
}


