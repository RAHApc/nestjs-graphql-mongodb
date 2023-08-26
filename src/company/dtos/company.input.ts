import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CompanyEntity } from 'src/model/entities/company.entity';

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;
}
@InputType()
export class DeleteCompanyInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateCompanyInput extends CreateCompanyInput {}


@ObjectType()
export class GetCompaniesOutput extends CoreOutput {
  @Field(() => [CompanyEntity], { nullable: true })
  company?: CompanyEntity[];
}

@ObjectType()
export class GetCompanyOutput extends CoreOutput {
  @Field(() => CompanyEntity, { nullable: true })
  company?: CompanyEntity;
}

@ObjectType()
export class CreateCompanyOutput extends CoreOutput {
  @Field({ nullable: true })
  name?: string;
}

@ObjectType()
export class UpdateCompanyOutput extends CoreOutput {
  @Field(() => CompanyEntity, { nullable: true })
  company?: CompanyEntity;
}
