import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { IStatus } from '../interfaces/calls.interfaces';

export type CallDoc = Call & Document;

@Schema({
  timestamps: {
    createdAt: '_created',
    updatedAt: '_updated',
  },
})
export class Call {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client_id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  technician_id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  responsible_id: string;

  @Prop({ type: String, default: '' })
  service_details: string;

  @Prop({ type: String, default: '' })
  problem_details: string;

  @Prop({ type: String, default: '' })
  solution_details: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ enum: IStatus, type: String, default: IStatus.OPEN })
  status: string;

  @Prop(Number)
  price: number;

  @Prop({ type: Boolean, default: false })
  is_paid: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Address' })
  address: string;

  @Prop({ type: Date, default: Date.now })
  date_start: Date;

  @Prop({ type: Date, default: null })
  date_ended: Date;
}

export const CallSchema = SchemaFactory.createForClass(Call);

CallSchema.pre('save', async function (next) {
  next();
});
