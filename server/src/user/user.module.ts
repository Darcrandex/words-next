import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { UserController } from './user.controller'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [UserController],
})
export class UserModule {}
