import {BadRequestException, Injectable} from '@nestjs/common'
import * as bcryptjs from 'bcryptjs'
import {InjectKnex} from 'nestjs-knex'
import {Knex} from 'knex'
import {UserDatabaseRecord, UserLoginDto, UserRegisterDto, UserResponseDto} from './user.dto'
import {tables} from 'tables'
import {pick} from 'lodash/fp'

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex<UserDatabaseRecord>) {}

  async createOne(userRegisterDto: UserRegisterDto) {
    const {password, email} = userRegisterDto

    try {
      const existingUser = await this.findOne({email})

      if (existingUser) {
        throw new BadRequestException({
          default: 'Email is taken',
        })
      }
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts ~ line 28 ~ UserService ~ createOne ~ error', error)
      throw error
    }

    try {
      const passwordHash = await bcryptjs.hash(password, 10)

      const [user] = await this.knex(tables.users)
        .insert({
          email,
          password: passwordHash,
        })
        .returning<UserResponseDto[]>(['id', 'email'])

      return user
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts ~ line 44 ~ UserService ~ createOne ~ error', error)
      throw error
    }
  }

  async validateLogin(userLoginDto: UserLoginDto) {
    const {email, password} = userLoginDto

    try {
      const user = await this.findOne({email})

      const valid = await bcryptjs.compare(password, user?.password || '')

      if (valid) {
        return pick(['id', 'email'], user)
      }

      return null
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts ~ line 55 ~ UserService ~ validateLogin ~ error', error)
      throw error
    }
  }

  async validateSession(userId?: string) {
    try {
      const user = await this.findOne({id: userId})

      if (user) {
        return pick(['id', 'email'], user)
      }

      return null
    } catch (error) {
      console.log('🚀 ~ file: user.service.ts ~ line 77 ~ UserService ~ validateSession ~ error', error)

      throw error
    }
  }

  async findOne({email, id}: {id?: string; email?: string}) {
    return this.knex(tables.users)
      .modify((qb) => {
        if (id) {
          qb.where('id', '=', id)
        }
        if (email) {
          qb.where('email', '=', email)
        }
      })
      .select<UserDatabaseRecord>('id', 'email', 'password')
      .first()
  }
}
