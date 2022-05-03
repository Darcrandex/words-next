import { Prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class TagGroup extends TimeStamps {
  @Prop()
  name: string
}
