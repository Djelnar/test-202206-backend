import {BadRequestException, Body, Controller, Get, Post, Req, Res, Session, UseGuards} from '@nestjs/common'
import {Request, Response} from 'express'
import {CurrentUser} from 'src/decorators/current-user'
import {UserLoginDto, UserRegisterDto, UserResponseDto} from './user.dto'
import {UserGuard} from './user.guard'
import {UserService} from './user.service'

type UserSession = {
  userId: string
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('me')
  async me(@CurrentUser() user: UserResponseDto) {
    try {
      return user
    } catch (error) {
      console.log('🚀 ~ file: user.controller.ts ~ line 22 ~ UserController ~ me ~ error', error)
      throw error
    }
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto, @Session() session: UserSession) {
    try {
      const user = await this.userService.createOne(userRegisterDto)

      session.userId = user.id

      return user
    } catch (error) {
      console.log('🚀 ~ file: user.controller.ts ~ line 36 ~ UserController ~ register ~ error', error)
      throw error
    }
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Session() session: UserSession) {
    try {
      const user = await this.userService.validateLogin(userLoginDto)

      if (!user) {
        throw new BadRequestException({
          default: 'Invalid credentials',
        })
      }

      session.userId = user.id

      return user
    } catch (error) {
      console.log('🚀 ~ file: user.controller.ts ~ line 50 ~ UserController ~ login ~ error', error)
      throw error
    }
  }

  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.end('ok')
    })
  }
}
