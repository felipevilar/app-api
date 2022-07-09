import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/address/dto/address.dto';
import { ContactDto } from './contact.dto';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  register: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}
