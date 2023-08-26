import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobService } from './job.service';
import {
  CreateJobInput,
  CreateJobOutput,
  GetJobOutput,
  GetJobsOutput,
  UpdateJobInput,
  UpdateJobOutput,
} from './dtos/job.input';
import { JobEntity } from '../model/entities/job.entity';

@Resolver(() => JobEntity)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => GetJobsOutput)
  async getJobs(): Promise<GetJobsOutput> {
    return this.jobService.getJobs();
  }

  @Query((returns) => GetJobOutput)
  async getJobById(@Args('id') id: string): Promise<GetJobOutput> {
    return this.jobService.getJobById(id);
  }

  @Mutation(() => CreateJobOutput)
  async createJob(
    @Args('input') createJobInput: CreateJobInput,
  ): Promise<CreateJobOutput> {
    return this.jobService.createJob(createJobInput);
  }

  @Mutation(() => UpdateJobOutput)
  async updateJob(
    @Args('id') id: string,
    @Args('input') updateJobInput: UpdateJobInput,
  ): Promise<UpdateJobOutput> {
    return this.jobService.updateJob(id, updateJobInput);
  }

  @Mutation(() => GetJobOutput)
  async deleteJob(@Args('id') id: string): Promise<GetJobOutput> {
    return this.jobService.deleteJob(id);
  }
}
