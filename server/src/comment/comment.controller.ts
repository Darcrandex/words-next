import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Comment } from '@app/db/models/comment.model'
import { ReturnModelType } from '@typegoose/typegoose'

@Controller('comment')
export class CommentController {
  constructor(
    @InjectModel(Comment)
    readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}

  @Get('/list')
  async findAll(@Query() query: Comment & { page?: string; size?: string }) {
    const { page, size, commentId, ...rest } = query
    const pageNumber = parseInt(page ?? '1')
    const pageSize = parseInt(size ?? '10')

    // 判断 commentId 是否为空
    // commentId = undefined 表示查 1 级
    // commentId 不为空，表示查 2，3 级
    const filter = { ...rest, commentId: { $eq: commentId || null } }

    const list = await this.commentModel
      .find(filter)
      .sort({ createdAt: -1 }) // 时间倒序
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate('from')
      .populate('to')
      .exec()

    const total = await this.commentModel.find(filter).count()
    return { list, total }
  }

  @Post('/create')
  async create(@Body() createDto: Comment) {
    const record = await this.commentModel.create(createDto)
    return record
  }
}
