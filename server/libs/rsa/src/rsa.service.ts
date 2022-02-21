import { Injectable } from '@nestjs/common'
import * as NodeRSA from 'node-rsa'

@Injectable()
export class RsaService {
  private key: NodeRSA

  constructor() {
    this.key = new NodeRSA({ b: 512 })
  }

  getPublicKey() {
    return this.key.exportKey('public')
  }

  encrypt(data: string) {
    return this.key.encrypt(data, 'base64')
  }

  decrypt(data: string) {
    return this.key.decrypt(data, 'utf8')
  }
}
