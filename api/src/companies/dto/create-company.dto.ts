import { IsString, Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug must be lowercase letters, numbers and dashes only' })
  slug: string;
}
