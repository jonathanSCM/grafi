import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug must be lowercase letters, numbers and dashes only' })
  slug: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
