import { IsOptional, IsString } from 'class-validator';

export class RegisterCardDto {
  @IsOptional()
  @IsString()
  serial?: string;
}
