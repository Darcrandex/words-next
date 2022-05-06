import { Prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export enum Roles {
  Admin = 'admin', // 后台管理员
  Account = 'account', // 微信用户
}

export class User extends TimeStamps {
  // 数据库必须字段
  @Prop({ required: true })
  role!: Roles

  // 微信用户才有 opendId
  @Prop({ required: false })
  openid?: string

  // 自定义字段
  // 个人空间背景
  @Prop()
  bgUrl?: string

  // 个人描述(相当于个性签名)
  @Prop()
  description?: string

  // 小程序用户数据自带字段
  @Prop()
  nickName: string

  @Prop()
  avatarUrl: string

  @Prop()
  city: string

  @Prop()
  country: string

  @Prop()
  gender: number

  @Prop()
  language: string

  @Prop()
  province: string
}
