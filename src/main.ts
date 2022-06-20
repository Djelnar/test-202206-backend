import {BadRequestException, ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import * as connectRedis from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import Redis from 'ioredis'
import {AppModule} from './app.module'

const RedisStore = connectRedis(session)
const redisClient = new Redis({
  host: 'redis',
})

const cookieSecure = process.env.NODE_ENV === 'production'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.set('trust proxy', 1)

  app.use(cookieParser())

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {httpOnly: true, maxAge: 100000000, secure: cookieSecure},
      store: new RedisStore({client: redisClient}),
    }),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const prepared = errors.reduce((acc, curr) => {
          acc[curr.property] = Object.values(curr.constraints)
          return acc
        }, {})

        return new BadRequestException(prepared)
      },
    }),
  )

  await app.listen(4000, '0.0.0.0')
}
bootstrap()
