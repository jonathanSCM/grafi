import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { CreateLinkDto } from './create-link.dto';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
