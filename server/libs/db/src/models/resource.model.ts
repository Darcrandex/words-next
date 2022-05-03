import { Prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

import { Author } from './author.model'
import { Category } from './category.model'

export class Resource extends TimeStamps {
  @Prop()
  name: string

  @Prop({ required: true, ref: () => Category })
  category: Ref<Category>

  @Prop()
  description?: string

  @Prop({ required: false, ref: () => Author })
  author?: Ref<Author>
}
