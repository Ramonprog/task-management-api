import { Body, Controller, Post } from '@nestjs/common'
import { AuthResponseDTO } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): AuthResponseDTO {
    return this.AuthService.signIn(username, password)
  }
}
