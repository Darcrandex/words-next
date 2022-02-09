import { Test, TestingModule } from '@nestjs/testing'
import { TagGroupController } from './tag-group.controller'

describe('TagGroupController', () => {
  let controller: TagGroupController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagGroupController],
    }).compile()

    controller = module.get<TagGroupController>(TagGroupController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
