import { Prop } from '@typegoose/typegoose'

export class Category {
  @Prop()
  name: string

  @Prop()
  description?: string

  @Prop()
  cover?: string
}
