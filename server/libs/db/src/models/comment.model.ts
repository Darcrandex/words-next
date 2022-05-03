import { Prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

import { User } from './user.model'

// 评论分 3 种
// 1.句子的评论
// 2.评论的回复；有 commentId
// 3.回复的回复；有 commentId 和 to

export class Comment extends TimeStamps {
  @Prop({ required: true })
  paragraphId!: string // 哪个句子

  @Prop()
  commentId?: string // 评论的父级评论；如果有，则是回复，没有则是句子的评论

  @Prop({ required: true })
  content!: string

  @Prop({ required: true, ref: () => User })
  from!: Ref<User>

  @Prop({ required: false, ref: () => User })
  to?: Ref<User> // 回复哪个用户的评论，如果有，首先它一定有 commentId
}
