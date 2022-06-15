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
import { Resource } from '@app/db/models/resource.model'

@Controller('resource')
export class ResourceController {
  constructor(
    @InjectModel(Resource)
    readonly resourceModel: ReturnModelType<typeof Resource>,
  ) {}

  @Post('/create')
  async create(@Body() createDto: Resource) {
    const created = await this.resourceModel.create(createDto)
    return { _id: created._id }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    const removed = await this.resourceModel.findByIdAndRemove(id)
    return { removed }
  }

  // 因为小程序的请求函数没有 Patch 方法
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<Resource>) {
    const record = await this.resourceModel.findByIdAndUpdate(id, updateDto)
    return { record }
  }

  @Get('/list')
  async findAll(@Query() query: Resource & { page?: string; size?: string }) {
    const { page, size, ...rest } = query
    const pageSize = parseInt(size ?? '10')
    const pageNumber = parseInt(page ?? '1')

    const list = await this.resourceModel
      .find(rest)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate('category')
      .populate('author')
      .exec()
    const total = await this.resourceModel.find(rest).count()
    return { list, total }
  }

  @Get('/detail/:id')
  async findById(@Param('id') id: string) {
    const record = await this.resourceModel.findById(id)
    return record
  }
}
