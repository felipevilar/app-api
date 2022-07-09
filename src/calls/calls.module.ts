import { CallSchema } from './model/call.model';
import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    AddressModule,
    MongooseModule.forFeature([
      {
        name: 'Call',
        schema: CallSchema,
      },
    ]),
  ],
  controllers: [CallsController],
  providers: [CallsService],
})
export class CallsModule {}
