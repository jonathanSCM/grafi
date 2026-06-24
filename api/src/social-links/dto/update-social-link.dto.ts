import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { CreateSocialLinkDto } from './create-social-link.dto';

export class UpdateSocialLinkDto extends PartialType(CreateSocialLinkDto) {
  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
