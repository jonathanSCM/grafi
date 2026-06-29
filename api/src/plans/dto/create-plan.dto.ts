import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsNumber()
  @Min(0)
  priceMonthly: number;

  @IsInt()
  @Min(1)
  maxButtons: number;

  @IsInt()
  @Min(1)
  maxCollaborators: number;
}
