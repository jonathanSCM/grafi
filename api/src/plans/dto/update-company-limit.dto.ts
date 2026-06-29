import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCompanyLimitDto {
  @IsOptional()
  @IsString()
  planId?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  collaboratorLimitOverride?: number | null;
}
