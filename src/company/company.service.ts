import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCompanyInput,
  CreateCompanyOutput,
  DeleteCompanyInput,
  GetCompaniesOutput,
  GetCompanyOutput,
  UpdateCompanyInput,
  UpdateCompanyOutput,
} from './dtos/company.input';
import { Company } from '../model/models/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createCompany(
    createCompanyInput: CreateCompanyInput,
  ): Promise<CreateCompanyOutput> {
    try {
      const newCompany = await this.companyModel.create({
        ...createCompanyInput,
      });
      return { name: newCompany.name, message: 'ok', ok: true };
    } catch (error) {
      return {
        ok: false,
        message: 'Could not create company',
      };
    }
  }

  async getCompanies(): Promise<GetCompaniesOutput> {
    try {
      const company = await this.companyModel
        .find()
        .populate(['jobs'])
      if (!company) {
        return {
          message: 'company not found',
          ok: false,
        };
      }
      return { company, message: 'success', ok: true };
    } catch (error) {
      return { message: 'Could not load company', ok: true };
    }
  }

  async getCompanyById(id: string): Promise<GetCompanyOutput> {
    try {
      const company = await this.companyModel
        .findById(id)
        .populate(['jobs', 'activities', 'personnels', 'units']);
      if (!company) {
        return {
          message: 'company not found',
          ok: false,
        };
      }
      return { company, message: 'success', ok: true };
    } catch (error) {
      return { message: 'Could not load company', ok: true };
    }
  }

  async updateCompany(
    id: string,
    updateCompanyInput: UpdateCompanyInput,
  ): Promise<UpdateCompanyOutput> {
    try {
      const company = await this.companyModel.findByIdAndUpdate(
        id,
        { $set: { ...updateCompanyInput } },
        { new: true },
      );
      if (!company) {
        return { message: `Company with id ${id} not found`, ok: false };
      }
      return { company, message: 'success', ok: true };
    } catch (error) {
      return {
        message: 'Could not delete company',
        ok: false,
      };
    }
  }

  async deleteCompany({ id }: DeleteCompanyInput): Promise<GetCompanyOutput> {
    try {
      console.log(id);
      const deleteCompany = await this.companyModel.findByIdAndDelete(id);
      if (!deleteCompany) {
        return {
          message: 'company not found',
          ok: false,
        };
      }
      return { message: 'success', ok: true };
    } catch (error) {
      return {
        message: 'Could not delete company',
        ok: false,
      };
    }
  }
}

