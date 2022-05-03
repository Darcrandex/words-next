import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from '@app/db'
import { RsaModule } from '@app/rsa'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ParagraphModule } from './paragraph/paragraph.module'
import { AuthorModule } from './author/author.module'
import { TagGroupModule } from './tag-group/tag-group.module'
import { TagModule } from './tag/tag.module'
import { CategoryModule } from './category/category.module'
import { ResourceModule } from './resource/resource.module'
import { FileModule } from './file/file.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'

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
    RsaModule,

    ParagraphModule,
    AuthorModule,
    TagGroupModule,
    TagModule,
    CategoryModule,
    ResourceModule,
    FileModule,
    UserModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
