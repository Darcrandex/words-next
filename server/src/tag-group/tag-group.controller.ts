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
import { InjectModel } from 'nestjs-typegoose'
import { TagGroup } from '@app/db/models/tag-group.model'

@Controller('tag-group')
export class TagGroupController {
  constructor(
    @InjectModel(TagGroup)
    readonly tagGroupModel: ReturnModelType<typeof TagGroup>,
  ) {}

  @Post('/create')
  async create(@Body() createDto: TagGroup) {
    const created = await this.tagGroupModel.create(createDto)
    return { _id: created._id }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    const removed = await this.tagGroupModel.findByIdAndRemove(id)
    return { removed }
  }

  // 因为小程序的请求函数没有 Patch 方法
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<TagGroup>) {
    const record = await this.tagGroupModel.findByIdAndUpdate(id, updateDto)
    return { record }
  }

  @Get('/list')
  async findAll(@Query() query: { page?: string; pageSize?: string }) {
    const pageSize = parseInt(query?.pageSize) || 10
    const pageNumber = parseInt(query.page ?? '1')

    const list = await this.tagGroupModel
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec()
    const total = await this.tagGroupModel.count()
    return { list, total }
  }

  @Get('/detail/:id')
  async findById(@Param('id') id: string) {
    const record = await this.tagGroupModel.findById(id)
    return { record }
  }
}
