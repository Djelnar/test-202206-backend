import {PickType} from '@nestjs/swagger'
import {IsAlphanumeric, IsInt, IsOptional, IsUUID, Min, MinLength} from 'class-validator'
import {LTE} from 'src/decorators/lte'
import {BaseRow} from 'src/lib/base-row.schema'

export class MedicationDatabaseRecord extends BaseRow {
  @IsAlphanumeric()
  @MinLength(3)
  name: string

  @MinLength(3)
  description: string

  @IsInt()
  @Min(0)
  @LTE(MedicationDatabaseRecord, 'destinationCount')
  count: number

  @IsInt()
  @Min(1)
  destinationCount: number

  @IsUUID('4')
  userId: string
}

export class MedicationIdParams {
  @IsUUID('4')
  id: string
}
export class MedicationUpsertDto extends PickType(MedicationDatabaseRecord, [
  'name',
  'description',
  'count',
  'destinationCount',
] as const) {
  @IsOptional()
  @IsUUID('4')
  id?: string
}
export class MedicationResponseDto extends PickType(MedicationDatabaseRecord, [
  'id',
  'name',
  'description',
  'count',
  'destinationCount',
  'updated_at',
] as const) {}
