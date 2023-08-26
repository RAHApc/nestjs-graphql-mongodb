import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { Role } from '../enums/user-role.enum';

@ObjectType()
export class UserEntity {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field(() => Role)
  @IsEnum(Role)
  role: Role;
}
