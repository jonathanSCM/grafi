import { IsBoolean, IsEnum, IsHexColor, IsOptional, IsString, IsUrl } from 'class-validator';

enum ThemeDto {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

enum BackgroundTypeDto {
  THEME = 'THEME',
  SOLID = 'SOLID',
  GRADIENT = 'GRADIENT',
}

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  website?: string;

  @IsOptional()
  @IsBoolean()
  redirectEnabled?: boolean;

  @IsOptional()
  @IsEnum(ThemeDto)
  theme?: ThemeDto;

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
