import * as JWT from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { JWTModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JWTModuleOptions,
  ) {}

  sign(payload: Object): string {
    return JWT.sign(payload, this.options.privateKey);
  }

  verify(token:string){
    return JWT.verify(token,this.options.privateKey)
  }
}
