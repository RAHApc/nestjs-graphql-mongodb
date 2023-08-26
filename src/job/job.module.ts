import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from '../model/models/job.model';
import { CompanySchema } from '../model/models/company.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema },{ name: 'Company', schema: CompanySchema }]),
  ],
  providers: [JobService, JobResolver],
})
export class JobModule {}
