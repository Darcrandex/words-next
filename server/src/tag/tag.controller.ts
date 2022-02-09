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
import { Tag } from '@app/db/models/tag.model'

@Controller('tag')
export class TagController {
  constructor(
    @InjectModel(Tag) readonly tagModel: ReturnModelType<typeof Tag>,
  ) {}

  @Post('/create')
  async create(@Body() createDto: Tag) {
    const created = await this.tagModel.create(createDto)
    return { _id: created._id }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    const removed = await this.tagModel.findByIdAndRemove(id)
    return { removed }
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<Tag>) {
    const record = await this.tagModel.findByIdAndUpdate(id, updateDto)
    return { record }
  }

  @Get('/list')
  async findAll(@Query() query: { page?: string }) {
    const pageSize = 10
    const pageNumber = parseInt(query.page ?? '1')
    const list = await this.tagModel
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate('group')
      .exec()
    const total = await this.tagModel.count()
    return { list, total }
  }

  @Get('/detail/:id')
  async findById(@Param('id') id: string) {
    const record = await this.tagModel.findById(id)
    return { record }
  }
}
