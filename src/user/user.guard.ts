import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Request} from 'express'
import {UserService} from './user.service'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const session = request?.session as any

    const userId = session?.userId

    if (userId) {
      const user = await this.userService.validateSession(userId)

      if (user) {
        ;(request as any).user = user
        return true
      }
      return false
    }

    return false
  }
}
