import { Type } from 'class-transformer';
import { IsInt, IsJSON, IsOptional, IsPositive } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsJSON()
  where: string;

  @IsOptional()
  @IsJSON()
  sort: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  max: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  page: number;
}
