import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ContactDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  @IsNotEmpty()
  phone2: string;
}
