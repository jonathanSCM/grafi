import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum LinkTypeDto {
  WHATSAPP = 'WHATSAPP',
  CALL = 'CALL',
  EMAIL = 'EMAIL',
  WEBSITE = 'WEBSITE',
  PROJECTS = 'PROJECTS',
  SCHEDULE_MEETING = 'SCHEDULE_MEETING',
  SAVE_CONTACT = 'SAVE_CONTACT',
  CUSTOM = 'CUSTOM',
}

export class CreateLinkDto {
  @IsEnum(LinkTypeDto)
  type: LinkTypeDto;

  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
