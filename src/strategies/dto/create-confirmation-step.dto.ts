import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfirmationStepDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  strategyId: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}