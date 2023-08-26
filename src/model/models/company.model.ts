import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Job } from './job.model';


@Schema()
export class Company extends mongoose.Document {

  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }] })
  jobs: Job[];

}

export const CompanySchema = SchemaFactory.createForClass(Company);
