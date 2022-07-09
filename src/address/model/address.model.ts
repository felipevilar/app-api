import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDoc = Address & Document;

@Schema({
  timestamps: {
    createdAt: '_created',
    updatedAt: '_updated',
  },
  collection: 'address',
})
export class Address {
  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, default: '' })
  complement: string;

  @Prop({ type: String, default: '' })
  number: string;

  @Prop({ type: String, default: '' })
  city: string;

  @Prop({ type: String, default: '' })
  state: string;

  @Prop({ type: String, default: '' })
  zipCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
