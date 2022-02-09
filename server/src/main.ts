import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('api-docs')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addTag('paragraph')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  // 获取环境变量
  // 虽然官方推荐使用 ConfigService，但是这样也是可以的
  const port = process.env.PORT
  await app.listen(port)
}

bootstrap()
