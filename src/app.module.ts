import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { JwtMiddleware } from './jwt/jwt.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get<string>('DATABASE_URL'),
        };
        return options;
      },
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    JobModule,
    CompanyModule,
    AuthModule,
    JwtModule.forRoot({ privateKey: process.env.SECRET_KEY }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
