import { Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'
import { v4 as uuidv4 } from 'uuid'
import { hashSync } from 'bcrypt'

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = []

  create(user: UserDto): UserDto {
    const password = hashSync(user.password, 10)
    const newUser = { id: uuidv4(), ...user, password }
    this.users.push(newUser)
    return newUser
  }

  findAll(): UserDto[] {
    return this.users
  }

  findOne(username: string): UserDto | null {
    return this.users.find((user) => user.username === username) || null
  }
}
