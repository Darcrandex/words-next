import { Prop } from '@typegoose/typegoose'

export class User {
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
