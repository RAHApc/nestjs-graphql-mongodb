import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { JobEntity } from './job.entity';

  
@ObjectType()
export class CompanyEntity {

  @Field()
  @IsString()
  name: string;

  @Field(() => [JobEntity], { nullable: true })
  jobs?: JobEntity[];
}
