import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from './user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: UserDto) {
    return this.usersService.create(user)
  }

  @Get()
  findAll(): UserDto[] {
    return this.usersService.findAll()
  }
}
