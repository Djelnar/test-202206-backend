import {createParamDecorator, ExecutionContext} from '@nestjs/common'
import {UserResponseDto} from 'src/user/user.dto'

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user as UserResponseDto
})
