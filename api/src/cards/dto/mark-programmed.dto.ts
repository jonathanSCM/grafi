import { IsBoolean } from 'class-validator';

export class MarkProgrammedDto {
  @IsBoolean()
  programmed: boolean;
}
