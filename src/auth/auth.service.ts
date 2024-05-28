import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { AuthResponseDTO } from './auth.dto'
import { compareSync as bcryptCompareSync } from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  private jwtExpirationTimeSeconds: number

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeSeconds =
      +this.configService.get<number>('JWT_EXPIRES_TIME')
  }

  async signIn(username: string, password: string): Promise<AuthResponseDTO> {
    const foundUser = this.userService.findOne(username)

    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isAuthenticated = bcryptCompareSync(password, foundUser.password)

    if (!isAuthenticated) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: foundUser.id, username: foundUser.username }
    const token = this.jwtService.sign(payload)

    return {
      token,
      expiresIn: this.jwtExpirationTimeSeconds,
    }
  }
}
