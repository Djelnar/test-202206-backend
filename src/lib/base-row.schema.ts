import {IsDateString, IsUUID} from 'class-validator'

export class BaseRow {
  @IsUUID('4')
  id: string

  @IsDateString()
  created_at: string

  @IsDateString()
  updated_at: string
}
