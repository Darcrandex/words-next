import { RsaService } from '@app/rsa'
import { Controller, Get } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly rsaService: RsaService) {}

  @Get('/get-public-key')
  async getPublicKey() {
    return this.rsaService.getPublicKey()
  }
}
