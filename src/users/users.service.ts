import { Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    { id: '1', username: 'john', password: 'changeme' },
    { id: '2', username: 'chris', password: 'secret' },
  ]

  create(user: UserDto) {
    return `This action adds a new user with username: ${user.username}`
  }
}
