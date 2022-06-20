import {Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards} from '@nestjs/common'
import {CurrentUser} from 'src/decorators/current-user'
import {UserResponseDto} from 'src/user/user.dto'
import {UserGuard} from 'src/user/user.guard'
import {MedicationIdParams, MedicationUpsertDto} from './medication.dto'
import {MedicationService} from './medication.service'

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @UseGuards(UserGuard)
  @Get()
  async getAll(@CurrentUser() user: UserResponseDto) {
    try {
      const userMedications = await this.medicationService.getAll({userId: user.id})

      return userMedications
    } catch (error) {
      console.log('🚀 ~ file: medication.controller.ts ~ line 37 ~ MedicationController ~ getAll ~ error', error)
      throw error
    }
  }

  @UseGuards(UserGuard)
  @Post()
  async upsertOne(@Body() medicationUpsertDto: MedicationUpsertDto, @CurrentUser() user: UserResponseDto) {
    try {
      if (medicationUpsertDto.id) {
        const medication = await this.medicationService.updateOne(medicationUpsertDto, user)

        return medication
      } else {
        const medication = await this.medicationService.createOne(medicationUpsertDto, user)

        return medication
      }
    } catch (error) {
      console.log('🚀 ~ file: medication.controller.ts ~ line 51 ~ MedicationController ~ createOne ~ error', error)
      throw error
    }
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteOne(@CurrentUser() user: UserResponseDto, @Param() params: MedicationIdParams) {
    try {
      if (params.id) {
        await this.medicationService.deleteOne({id: params.id, userId: user.id})

        return true
      } else {
        throw new NotFoundException()
      }
    } catch (error) {
      console.log('🚀 ~ file: medication.controller.ts ~ line 56 ~ MedicationController ~ deleteOne ~ error', error)
      throw error
    }
  }

  @UseGuards(UserGuard)
  @Get(':id')
  async getOne(@CurrentUser() user: UserResponseDto, @Param() params: MedicationIdParams) {
    try {
      const medication = await this.medicationService.getOne({id: params.id, userId: user.id})

      if (medication) {
        return medication
      }
      console.log(322)
      throw new NotFoundException()
    } catch (error) {
      console.log('🚀 ~ file: medication.controller.ts ~ line 73 ~ MedicationController ~ getOne ~ error', error)
      throw error
    }
  }
}
