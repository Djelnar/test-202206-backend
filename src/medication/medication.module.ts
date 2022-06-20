import {Module} from '@nestjs/common'
import {MedicationService} from './medication.service'
import {MedicationController} from './medication.controller'
import {UserModule} from 'src/user/user.module'

@Module({
  providers: [MedicationService],
  controllers: [MedicationController],
  imports: [UserModule],
})
export class MedicationModule {}
