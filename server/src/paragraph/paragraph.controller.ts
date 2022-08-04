import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { Paragraph } from '@app/db/models/paragraph.model'

@ApiBearerAuth()
@ApiTags('paragraph')
@Controller('paragraph')
export class ParagraphController {
  constructor(
    @InjectModel(Paragraph)
    readonly paragraphModel: ReturnModelType<typeof Paragraph>,
  ) {}

  @Post('/create')
  async create(@Body() createDto: Paragraph) {
    const created = await this.paragraphModel.create(createDto)
    return { _id: created._id }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    const removed = await this.paragraphModel.findByIdAndRemove(id)
    return { removed }
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<Paragraph>) {
    const record = await this.paragraphModel.findByIdAndUpdate(id, updateDto)
    return { record }
  }

  @Get('/list')
  async findAll(
    @Query()
    query: Paragraph & {
      page?: string
      pageSize?: string
      category?: string
      tag?: string
      keywords?: string
    },
  ) {
    const pageSize = parseInt(query?.pageSize) || 10
    const pageNumber = parseInt(query.page) || 1

    const queryObj = Object.assign(
      {},
      query.resource && { resource: query.resource },

      // 句子关联多个标签，查询出 tags 中包含 tag 的记录
      query.tag && { tags: { $elemMatch: { $eq: query.tag } } },
      // 模糊查询
      query.keywords && {
        content: { $regex: query.keywords, $options: 'i' },
      },
    )

    const list = await this.paragraphModel
      .find(queryObj)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: 'resource',
        populate: ['author', 'category'],
      })
      .populate('tags')
      .exec()
    const total = await this.paragraphModel.find(queryObj).count()
    return { list, total }
  }

  @Get('/detail/:id')
  async findById(@Param('id') id: string) {
    const record = await this.paragraphModel
      .findById(id)
      .populate({
        path: 'resource',
        populate: [{ path: 'author' }, { path: 'category' }],
      })
      .populate('tags')
      .exec()
    return record
  }

  @Get('/hot-words')
  async getHotWords() {
    return [
      '知否知否',
      '子不语',
      '但愿人长久',
      '最遥远的距离',
      '向来缘浅',
      '遗忘',
    ]
  }

  @Get('words-tips')
  async getWordsTips(@Query() query: { keywords: string }) {
    return [
      `${query.keywords}是什么`,
      `${query.keywords}能不能吃`,
      `${query.keywords}好像不错`,
      `${query.keywords}yyds`,
    ]
  }
}
