import { IsString } from 'class-validator';

export class CreateSocialLinkDto {
  @IsString()
  platform: string;

  @IsString()
  url: string;
}
