import { Module } from '@nestjs/common'
import { ParagraphController } from './paragraph.controller'

@Module({
  controllers: [ParagraphController],
})
export class ParagraphModule {}
