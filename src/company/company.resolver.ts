import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import {
  CreateCompanyInput,
  CreateCompanyOutput,
  DeleteCompanyInput,
  GetCompaniesOutput,
  GetCompanyOutput,
  UpdateCompanyInput,
  UpdateCompanyOutput,
} from './dtos/company.input';
import { setRole } from 'src/auth/setRole.decotor';

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @setRole(['ADMIN','USER'])
  @Query(() => GetCompaniesOutput)
  async getCompanies(
  ): Promise<GetCompaniesOutput> {
    return this.companyService.getCompanies();
  }

  @Query(() => GetCompanyOutput)
  async getCompanyById(@Args('id') id: string): Promise<GetCompanyOutput> {
    return this.companyService.getCompanyById(id);
  }

  @setRole(['ADMIN'])
  @Mutation(() => CreateCompanyOutput)
  async createCompany(
    @Args('input') createCompanyInput: CreateCompanyInput,
  ): Promise<CreateCompanyOutput> {
    return this.companyService.createCompany(createCompanyInput);
  }

  @setRole(['ADMIN'])
  @Mutation(() => UpdateCompanyOutput)
  async updateCompany(
    @Args('id') id: string,
    @Args('input') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companyService.updateCompany(id, updateCompanyInput);
  }

  @setRole(['ADMIN'])
  @Mutation(() => GetCompanyOutput)
  async deleteCompany(
    @Args('input') input: DeleteCompanyInput,
  ): Promise<GetCompanyOutput> {
    return this.companyService.deleteCompany(input);
  }
}
