import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = Document & User;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({
  timestamps: {
    createdAt: '_created',
    updatedAt: '_updated',
  },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, default: '' })
  surname: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [UserRole.USER] })
  roles: UserRole[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Address' })
  address: string;

  @Prop({ type: Object })
  contact: {
    phone1: string;
    phone2: string;
  };

  @Prop({ type: Object })
  info: {
    cpf: {
      number: string;
      images: string[];
    };
    rg: {
      number: string;
      images: string[];
    };
    payment: {
      pix: string;
      account: string;
      agency: string;
      bank: string;
    };
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  const user = this as UserDocument;
  if (user.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
  next();
});
