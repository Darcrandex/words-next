import { Prop } from '@typegoose/typegoose'

export class Author {
  @Prop()
  name: string

  @Prop()
  cover?: string

  @Prop()
  description?: string
}
