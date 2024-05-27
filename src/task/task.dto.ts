export class TaskDto {
  id: string
  title: string
  description: string
  status: string
  expirationDate: Date
}

export interface FindAllParametersDto {
  title: string
  status: string
}
