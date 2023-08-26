import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JWTModuleOptions } from './jwt.interface';
import { CONFIG_OPTIONS } from 'src/common/common.constant';

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JWTModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [JwtService, { provide: CONFIG_OPTIONS, useValue: options }],
      exports: [JwtService],
    };
  }
}
