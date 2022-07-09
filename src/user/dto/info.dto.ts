import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DocsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  number: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  images: string[];
}

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pix: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  account: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  agency: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bank: string;
}

export class InfoDto {
  @ValidateNested()
  @Type(() => DocsDto)
  cpf: DocsDto;

  @ValidateNested()
  @Type(() => DocsDto)
  rg: DocsDto;

  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;
}
