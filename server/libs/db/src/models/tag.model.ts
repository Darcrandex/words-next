import { Prop, Ref } from '@typegoose/typegoose'
import { TagGroup } from './tag-group.model'

export class Tag {
  @Prop()
  name: string

  @Prop({ required: true, ref: () => TagGroup })
  group: Ref<TagGroup>
}
