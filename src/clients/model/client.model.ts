import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ClientDoc = Client & Document;

@Schema({
  timestamps: {
    createdAt: '_created',
    updatedAt: '_updated',
  },
})
export class Client extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  register: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Address' })
  address: string;

  @Prop({ type: Object })
  contact: {
    email: string;
    phone1: string;
    phone2: string;
  };
}

export const ClientSchema = SchemaFactory.createForClass(Client);
