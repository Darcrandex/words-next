import { Module } from '@nestjs/common'
import { TagGroupController } from './tag-group.controller'

@Module({
  controllers: [TagGroupController],
})
export class TagGroupModule {}
