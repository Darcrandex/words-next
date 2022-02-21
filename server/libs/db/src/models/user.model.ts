import { Prop } from '@typegoose/typegoose'

export enum Roles {
  Admin = 'admin',
  Account = 'account',
}

export class User {
  @Prop({ required: true })
  role!: Roles

  @Prop({ required: true })
  openid!: string

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
