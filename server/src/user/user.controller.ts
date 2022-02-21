import { Roles, User } from '@app/db/models/user.model'
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { JwtService } from '@nestjs/jwt'
import axios from 'axios'

@Controller('user')
export class UserController {
  constructor(
    @InjectModel(User) readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: User) {
    const user = await this.userModel.create({
      ...createUserDto,
      role: Roles.Account,
    })
    return { user }
  }

  @Post('/login')
  async login(@Body() body: { code: string }) {
    const res = await axios.get<{ openid?: string; session_key: string }>(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        params: {
          js_code: body.code,
          appid: process.env.WECHAT_APP_ID,
          secret: process.env.WECHAT_APP_SECRET,
          grant_type: 'authorization_code',
        },
      },
    )

    if (!res.data.openid) {
      throw new UnauthorizedException('微信登录失败')
    }

    const user = await this.userModel.findOne({ openid: res.data.openid })

    if (user) {
      return { user, token: this.jwtService.sign(user.toObject()) }
    } else {
      return { user: undefined, openid: res.data.openid }
    }
  }
}
