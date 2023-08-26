import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Level } from '../enums/job-level.enum';
import { Company } from './company.model';


@Schema()
export class Job extends mongoose.Document {

  @Prop()
  title: string;

  @Prop({ type: String, enum: Level })
  level: Level;

  @Prop()
  unit: string;

  @Prop()
  superior: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;
}

export const JobSchema = SchemaFactory.createForClass(Job);



