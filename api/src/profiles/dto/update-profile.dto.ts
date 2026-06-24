import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsEnum, IsHexColor, IsOptional, IsString } from 'class-validator';

enum ThemeDto {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

enum PhotoStyleDto {
  COLOR = 'COLOR',
  BLACK_AND_WHITE = 'BLACK_AND_WHITE',
}

enum BackgroundTypeDto {
  THEME = 'THEME',
  SOLID = 'SOLID',
  GRADIENT = 'GRADIENT',
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsOptional()
  @IsEnum(ThemeDto)
  theme?: ThemeDto;

  @IsOptional()
  @IsEnum(PhotoStyleDto)
  photoStyle?: PhotoStyleDto;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsEnum(BackgroundTypeDto)
  backgroundType?: BackgroundTypeDto;

  @IsOptional()
  @IsHexColor()
  backgroundColor?: string;

  @IsOptional()
  @IsHexColor()
  backgroundTo?: string;

  @IsOptional()
  @IsHexColor()
  buttonColor?: string;

  @IsOptional()
  @IsHexColor()
  buttonTextColor?: string;

  @IsOptional()
  @IsHexColor()
  textColor?: string;
}
