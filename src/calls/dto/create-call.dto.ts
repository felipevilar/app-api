import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/address/dto/address.dto';
import { IStatus } from '../interfaces/calls.interfaces';

export class CreateCallDto {
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  technician_id: string;

  @IsString()
  @IsNotEmpty()
  responsible_id: string;

  @IsOptional()
  @IsString()
  service_details: string;

  @IsOptional()
  @IsString()
  problem_details: string;

  @IsOptional()
  @IsString()
  solution_details: string;

  @IsArray({
    each: true,
  })
  @IsUrl()
  @IsOptional()
  images: string[];

  @IsOptional()
  @IsEnum(IStatus)
  status: string;

  @IsOptional()
  @IsBoolean()
  is_paid: boolean;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date_start: Date;

  @IsString()
  @IsOptional()
  date_end: Date;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
