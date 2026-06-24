import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum EventTypeDto {
  PROFILE_VIEW = 'PROFILE_VIEW',
  NFC_SCAN = 'NFC_SCAN',
  QR_SCAN = 'QR_SCAN',
  WHATSAPP_CLICK = 'WHATSAPP_CLICK',
  PHONE_CLICK = 'PHONE_CLICK',
  EMAIL_CLICK = 'EMAIL_CLICK',
  SOCIAL_CLICK = 'SOCIAL_CLICK',
  CUSTOM_LINK_CLICK = 'CUSTOM_LINK_CLICK',
  SAVE_CONTACT_CLICK = 'SAVE_CONTACT_CLICK',
}

export class TrackEventDto {
  @IsEnum(EventTypeDto)
  eventType: EventTypeDto;

  @IsOptional()
  @IsString()
  linkId?: string;

  @IsOptional()
  @IsString()
  source?: string;
}
