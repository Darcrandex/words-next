import { Prop } from '@typegoose/typegoose'

import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Category extends TimeStamps {
  @Prop()
  name: string

  @Prop()
  description?: string

  @Prop()
  cover?: string
}
