import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import configScheme from './configScheme';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ClientsModule } from './clients/clients.module';
import { AddressModule } from './address/address.module';
import { CallsModule } from './calls/calls.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: Joi.object(configScheme),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
        dbName: configService.get('DATABASE_NAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    AddressModule,
    ClientsModule,
    CallsModule,
    UserModule,
    AuthModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
