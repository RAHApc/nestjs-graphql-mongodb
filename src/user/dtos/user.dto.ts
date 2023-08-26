import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from 'src/model/entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserOutput extends CoreOutput {
  @Field()
  email?: string;

  @Field()
  role?: string;

  @Field()
  token?:string
}
