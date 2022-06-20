import {Injectable} from '@nestjs/common'
import {InjectKnex} from 'nestjs-knex'
import {Knex} from 'knex'
import {MedicationDatabaseRecord, MedicationUpsertDto} from './medication.dto'
import {UserResponseDto} from 'src/user/user.dto'
import {tables} from 'tables'

@Injectable()
export class MedicationService {
  constructor(@InjectKnex() private readonly knex: Knex<MedicationDatabaseRecord>) {}

  async createOne(medication: MedicationUpsertDto, user: UserResponseDto) {
    try {
      const [createdMedication] = await this.knex(tables.medications)
        .insert({
          name: medication.name,
          description: medication.description,
          destinationCount: medication.destinationCount,
          count: medication.count,
          userId: user.id,
        })
        .returning<MedicationDatabaseRecord[]>(['id', 'name', 'description', 'count', 'destinationCount', 'updated_at'])

      return createdMedication
    } catch (error) {
      console.log('🚀 ~ file: medication.service.ts ~ line 26 ~ MedicationService ~ createOne ~ error', error)
      throw error
    }
  }

  async updateOne(medication: MedicationUpsertDto, user: UserResponseDto) {
    try {
      const [editedMedication] = await this.knex(tables.medications)
        .where({
          id: medication.id,
          userId: user.id,
        })
        .update({
          name: medication.name,
          description: medication.description,
          destinationCount: medication.destinationCount,
          count: medication.count,
        })
        .returning<MedicationDatabaseRecord[]>(['id', 'name', 'description', 'count', 'destinationCount', 'updated_at'])

      return editedMedication
    } catch (error) {
      console.log('🚀 ~ file: medication.service.ts ~ line 48 ~ MedicationService ~ editOne ~ error', error)
      throw error
    }
  }

  async getAll({userId}: {userId?: string}) {
    return this.knex(tables.medications)
      .where({
        userId,
      })
      .orderBy('updated_at', 'desc')
      .select<MedicationDatabaseRecord[]>('id', 'name', 'description', 'count', 'destinationCount', 'updated_at')
  }

  async getOne({id, userId}: {id: string; userId: string}) {
    try {
      const file = await this.knex(tables.medications)
        .modify((qb) => {
          if (id) {
            qb.where('id', '=', id)
          }
          if (userId) {
            qb.where('userId', '=', userId)
          }
        })
        .select<MedicationDatabaseRecord[]>('id', 'name', 'description', 'count', 'destinationCount', 'updated_at')
        .first()

      return file
    } catch (error) {
      console.log('🚀 ~ file: medication.service.ts ~ line 52 ~ MedicationService ~ getOne ~ error', error)
      throw error
    }
  }

  async deleteOne({id, userId}: {id: string; userId: string}) {
    try {
      await this.knex(tables.medications)
        .where({
          id: id,
          userId: userId,
        })
        .delete()
    } catch (error) {
      console.log('🚀 ~ file: medication.service.ts ~ line 87 ~ MedicationService ~ deleteOne ~ error', error)
      throw error
    }
  }
}
