import { Prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

import { TagGroup } from './tag-group.model'

export class Tag extends TimeStamps {
  @Prop()
  name: string

  @Prop({ required: true, ref: () => TagGroup })
  group: Ref<TagGroup>
}
