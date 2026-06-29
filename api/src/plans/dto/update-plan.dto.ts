import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMonthly?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxButtons?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxCollaborators?: number;
}
