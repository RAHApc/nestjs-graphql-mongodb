import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../model/models/job.model';
import {
  CreateJobInput,
  CreateJobOutput,
  GetJobOutput,
  GetJobsOutput,
  UpdateJobInput,
  UpdateJobOutput,
} from './dtos/job.input';
import { Company } from '../model/models/company.model';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createJob(createJobInput: CreateJobInput): Promise<CreateJobOutput> {
    const { companyName, ...data } = createJobInput;
    try {
      const company = await this.companyModel.findOne({
        name: companyName,
      });
      if (!company) {
        return {
          message: 'company not found',
          ok: false,
        };
      }
      
      const job =await  this.jobModel.create({ ...data, company });

      return { job, message: 'ok', ok: true };
    } catch (error) {
      console.log(error);
      return {
        ok: false, 
        message: 'Could not create job',
      };
    }
  }

  async getJobs(): Promise<GetJobsOutput> {
    try {
      const jobs = await this.jobModel.find().populate(['company']);
      if (!jobs) {
        return {
          message: 'jobs not found',
          ok: false,
        };
      }
      return { jobs, message: 'success', ok: true };
    } catch (error) {
      return { message: 'Could not load jobs', ok: true };
    }
  }

  async getJobById(id: string): Promise<GetJobOutput> {
    try {
      const job = await this.jobModel.findById(id).populate(['company']);
      if (!job) {
        return {
          message: 'job not found',
          ok: false,
        };
      }
      return { job, message: 'success', ok: true };
    } catch (error) {
      return { message: 'Could not load job', ok: true };
    }
  }

  async updateJob(
    id: string,
    updateJobInput: UpdateJobInput,
  ): Promise<UpdateJobOutput> {
    try {
      const updateJob = await this.jobModel.findByIdAndUpdate(
         id ,
        { $set: { ...updateJobInput } },
        { new: true },
      ).populate("company");
      if (!updateJob) {
        return { message: `job with id ${id} not found`, ok: false };
      }
      return { job: updateJob, message: 'success', ok: true };
    } catch (error) {
      return {
        message: 'Could not delete job',
        ok: false,
      };
    }
  }

  async deleteJob(id: string): Promise<GetJobOutput> {
    try {
      const deleteJob = await this.jobModel.findByIdAndDelete(id);
      if (!deleteJob) {
        return {
          message: 'job not found',
          ok: false,
        };
      }
      return { message: 'success', ok: true };
    } catch (error) {
      return {
        message: 'Could not delete job',
        ok: false,
      };
    }
  }
}
