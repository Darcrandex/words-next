import { Global, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { DbService } from './db.service'
import { Author } from './models/author.model'
import { Category } from './models/category.model'
import { Paragraph } from './models/paragraph.model'
import { Resource } from './models/resource.model'
import { TagGroup } from './models/tag-group.model'
import { Tag } from './models/tag.model'

const models = TypegooseModule.forFeature([
  Author,
  Resource,
  Paragraph,

  //於來源作品相關的
  Category,
  TagGroup,
  Tag,
])

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGO_DB_SERVER_URI }),
    }),

    models,
  ],

  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
