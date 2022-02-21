import { Roles, User } from '@app/db/models/user.model'
import { Body, Controller, Post } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import axios from 'axios'

@Controller('user')
export class UserController {
  constructor(
    @InjectModel(User) readonly userModel: ReturnModelType<typeof User>,
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

    const user = await this.userModel.findOne({ openid: res.data.openid })
    return { user: user || null, openid: res.data.openid }
  }
}
