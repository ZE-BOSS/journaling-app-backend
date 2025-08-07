import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStrategyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}