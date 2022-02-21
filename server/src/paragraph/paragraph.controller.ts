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
    query: Paragraph & { page?: string; pageSize?: string; keywords?: string },
  ) {
    const pageSize = parseInt(query?.pageSize) || 10
    const pageNumber = parseInt(query.page) || 1
    const list = await this.paragraphModel
      .find(
        Object.assign(
          {},
          query.resource && { resource: query.resource },
          query.tags && { tags: query.tags },
          query.keywords && {
            content: { $regex: query.keywords, $options: 'i' },
          },
        ),
      )
      .populate({
        path: 'resource',
        populate: [{ path: 'author' }, { path: 'category' }],
      })
      .populate('tags')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec()
    const total = await this.paragraphModel.count()
    return { list, total }
  }

  @Get('/detail/:id')
  async findById(@Param('id') id: string) {
    const record = await this.paragraphModel.findById(id)
    return { record }
  }
}
