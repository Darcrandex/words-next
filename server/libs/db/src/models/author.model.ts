import { Prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Author extends TimeStamps {
  @Prop()
  name: string

  @Prop()
  cover?: string

  @Prop()
  description?: string
}
