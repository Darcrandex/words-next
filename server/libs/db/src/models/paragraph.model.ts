import { Prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

import { Resource } from './resource.model'
import { Tag } from './tag.model'

export class Paragraph extends TimeStamps {
  @Prop({ required: true })
  content!: string

  @Prop({ required: true, ref: () => Resource })
  resource: Ref<Resource>

  @Prop()
  cover?: string

  @Prop()
  description?: string

  @Prop({ required: false, ref: () => Tag })
  tags?: Ref<Tag>[]
}
