import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Level } from '../enums/job-level.enum';
import { Company } from '../models/company.model';
import { Schema as MongooSchema, Types } from 'mongoose';
import { IsEnum, IsString } from 'class-validator';
import { CompanyEntity } from './company.entity';

@ObjectType()
export class JobEntity {
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

  @Field(() => CompanyEntity)
  company: CompanyEntity;
}
