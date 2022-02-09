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
import { Category } from '@app/db/models/category.model'
import { TagGroup } from '@app/db/models/tag-group.model'

@Controller('category')
export class CategoryController {
  constructor(
    @InjectModel(Category)
    readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @Post('/create')
  async create(@Body() createDto: TagGroup) {
    const created = await this.categoryModel.create(createDto)
    return { _id: created._id }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    const removed = await this.categoryModel.findByIdAndRemove(id)
    return { removed }
  }

  // 因为小程序的请求函数没有 Patch 方法
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<TagGroup>) {
    const record = await this.categoryModel.findByIdAndUpdate(id, updateDto)
    return { record }
  }

  @Get('/list')
  async findAll(@Query() query: { page?: string; pageSize?: string }) {
    const pageSize = parseInt(query?.pageSize) || 10
    const pageNumber = parseInt(query.page) || 1

    const list = await this.categoryModel
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec()
    const total = await this.categoryModel.count()
    return { list, total }
  }

  @Get('/detail/:id')
  async findById(@Param('id') id: string) {
    const record = await this.categoryModel.findById(id)
    return { record }
  }
}
