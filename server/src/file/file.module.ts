import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import * as MAO from 'multer-aliyun-oss'

import { FileController } from './file.controller'

@Module({
  imports: [
    // 阿里云 oss 配置
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
          }),
        }
      },
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
