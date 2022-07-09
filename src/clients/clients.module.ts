import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './model/client.model';
import { AuthModule } from 'src/auth/auth.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Client',
        schema: ClientSchema,
      },
    ]),
    AuthModule,
    AddressModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
