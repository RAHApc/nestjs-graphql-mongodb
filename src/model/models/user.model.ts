import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { Role } from '../enums/user-role.enum';
import { InternalServerErrorException } from '@nestjs/common';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified(this.password)) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    throw new InternalServerErrorException();
  }
});

UserSchema.methods.comparePassword=async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
}
