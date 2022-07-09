import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    AddressModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
