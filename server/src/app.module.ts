import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from '@app/db'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ParagraphModule } from './paragraph/paragraph.module'
import { UsersModule } from './users/users.module'
import { AuthorModule } from './author/author.module'
import { TagGroupModule } from './tag-group/tag-group.module'
import { TagModule } from './tag/tag.module'
import { CategoryModule } from './category/category.module'
import { ResourceModule } from './resource/resource.module'
import { FileModule } from './file/file.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      // 优先级从高到低
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.local',
        '.env',
      ],
    }),

    DbModule,
    ParagraphModule,
    UsersModule,
    AuthorModule,
    TagGroupModule,
    TagModule,
    CategoryModule,
    ResourceModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
