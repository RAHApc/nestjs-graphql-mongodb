import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/model/models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
