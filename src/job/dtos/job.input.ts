import {
  Field,
  ID,
  InputType,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { JobEntity } from 'src/model/entities/job.entity';
import { Level } from 'src/model/enums/job-level.enum';

@InputType()
export class CreateJobInput {
  @Field()
  @IsString()
  title: string;

  @Field(() => Level)
  @IsEnum(Level)
  level: Level;

  @Field()
  @IsString()
  unit: string;

  @Field()
  @IsString()
  superior: string;

  @Field(() => String)
  companyName: string;
}

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {}

@ObjectType()
export class GetJobsOutput extends CoreOutput {
  @Field(() => [JobEntity], { nullable: true })
  jobs?: JobEntity[];
}

@ObjectType()
export class GetJobOutput extends CoreOutput {
  @Field(() => JobEntity, { nullable: true })
  job?: JobEntity;
}

@ObjectType()
export class CreateJobOutput extends CoreOutput {
  // @Field()
  // id?: string;
  @Field(() => JobEntity, { nullable: true })
  job?: JobEntity;
}

@ObjectType()
export class UpdateJobOutput extends CoreOutput {
  @Field(() => JobEntity, { nullable: true })
  job?: JobEntity;
}
