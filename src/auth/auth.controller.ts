import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from '../common/guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {
  }

  @UseGuards(AuthGuard)
  @Get('/current')
  async getCurrentUserCustomer () {}

  @Post('/login')
  loginCustomer (@Body() body: LoginDto) {
    return this.authService.getAccessToken(body)
  }
}
