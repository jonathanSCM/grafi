import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AdminUpdateCardDto {
  @IsOptional()
  @IsString()
  serial?: string;

  @IsOptional()
  @IsBoolean()
  programmed?: boolean;
}
