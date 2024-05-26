import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { TaskDto } from './task.dto'

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = []
  create(task: TaskDto) {
    this.tasks.push(task)
    console.log(this.tasks)
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id)

    if (foundTask.length) {
      return foundTask[0]
    }
    throw new NotFoundException(`Task with ID ${id} not found`)
  }

  update(task: TaskDto): TaskDto {
    let taskIndex = this.tasks.findIndex((t) => t.id === task.id)

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task
      return task
    }

    throw new HttpException(
      `Task with ID ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    )
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1)
      return this.tasks
    }

    throw new HttpException(
      `Task with ID ${id} not found`,
      HttpStatus.BAD_REQUEST,
    )
  }
}
