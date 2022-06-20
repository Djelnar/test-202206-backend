import {Module} from '@nestjs/common'
import {KnexModule} from 'nestjs-knex'
import {UserModule} from './user/user.module'
import {MedicationModule} from './medication/medication.module'
import knexfile from 'knexfile'

@Module({
  imports: [
    KnexModule.forRoot({
      config: knexfile,
    }),
    UserModule,
    MedicationModule,
  ],
})
export class AppModule {}
