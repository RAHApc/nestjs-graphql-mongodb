import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/models/user.model';
import { CreateUserInput, LoginUserInput, UserOutput } from './dtos/user.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateUserInput): Promise<UserOutput> {
    try {
      const exists = await this.userModel.findOne({ email });
      if (!!exists) {
        return { message: 'There is user with that email already', ok: false };
      }
      await this.userModel.create({ email, password, role });

      return { email, role, message: 'success', ok: true };
    } catch (error) {
      return {
        message: "Couldn't create account",
        ok: false,
      };
    }
  }

  async login({ email, password }: LoginUserInput): Promise<UserOutput> {
    try {
      const user: any = await this.userModel.findOne({ email });
      if (!!user) {
        return { message: 'user not found', ok: false };
      }

      const passwordCorrect = await user.comparePassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          message: 'Wrong password',
        };
      }
      const token = this.jwtService.sign(user._id);
      return { token, message: 'success', ok: true };
    } catch (error) {
      return {
        message: "Couldn't create account",
        ok: false,
      };
    }
  }

  async findById(id: string): Promise<UserOutput> {
    try {
      const user = await this.userModel.findById(id);
      if (user) {
        return {
          email: user.email,
          role: user.role,
          message: 'success',
          ok: true,
        };
      }
    } catch (error) {
      return {
        message: 'User not found',
        ok: false,
      };
    }
  }
}
