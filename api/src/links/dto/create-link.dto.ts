import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LinkType } from '@prisma/client';

export class CreateLinkDto {
  @IsEnum(LinkType)
  type: LinkType;

  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
