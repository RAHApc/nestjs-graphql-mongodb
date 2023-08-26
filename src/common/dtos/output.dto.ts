import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field((type) => String)
  message: string;

  @Field((type) => Boolean)
  ok: boolean;
}
