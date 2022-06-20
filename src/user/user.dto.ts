import {PickType, OmitType} from '@nestjs/swagger'
import {IsEmail, MaxLength, MinLength} from 'class-validator'
import {Match} from 'src/decorators/match'
import {BaseRow} from 'src/lib/base-row.schema'

export class User extends BaseRow {
  @IsEmail()
  @MinLength(3)
  @MaxLength(30)
  email: string

  @MinLength(3)
  password: string

  @Match(User, 'password')
  passwordAgain: string
}

export class UserRegisterDto extends PickType(User, ['email', 'password', 'passwordAgain'] as const) {}
export class UserLoginDto extends PickType(User, ['email', 'password'] as const) {}
export class UserResponseDto extends PickType(User, ['email', 'id'] as const) {}
export class UserDatabaseRecord extends OmitType(User, ['passwordAgain'] as const) {}
