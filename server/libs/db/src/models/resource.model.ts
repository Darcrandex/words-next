import { Prop, Ref } from '@typegoose/typegoose'
import { Author } from './author.model'
import { Category } from './category.model'

export class Resource {
  @Prop()
  name: string

  @Prop({ required: true, ref: () => Category })
  category: Ref<Category>

  @Prop()
  description?: string

  @Prop({ required: false, ref: () => Author })
  author?: Ref<Author>
}
