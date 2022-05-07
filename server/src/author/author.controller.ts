import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { Author } from '@app/db/models/author.model'

@Controller('author')
export class AuthorController {
  constructor(
    @InjectModel(Author) readonly authorModel: ReturnModelType<typeof Author>,
  ) {}

  @Post('/create')
  async create(@Body() createDto: Author) {
    const created = await this.authorModel.create(createDto)
    return { _id: created._id }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    const removed = await this.authorModel.findByIdAndRemove(id)
    return { removed }
  }

  // 因为小程序的请求函数没有 Patch 方法
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<Author>) {
    const record = await this.authorModel.findByIdAndUpdate(id, updateDto)
    return { record }
  }

  @Get('/list')
  async findAll(@Query() query: { page?: string; pageSize?: string }) {
    const pageSize = parseInt(query?.pageSize) || 10
    const pageNumber = parseInt(query.page) || 1
    const list = await this.authorModel
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec()
    const total = await this.authorModel.count()
    return { list, total }
  }

  @Get('/detail/:id')
  async findById(@Param('id') id: string) {
    const record = await this.authorModel.findById(id)
    return record
  }
}
