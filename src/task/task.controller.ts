import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { TaskDto } from './task.dto'
import { TaskService } from './task.service'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    this.taskService.create(task)
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    this.taskService.findById(id)
  }
}
