import { IsNumber, IsString } from 'class-validator';

export class SummaryDto {
  @IsNumber()
  totalTrades: number;

  @IsNumber()
  totalWins: number;

  @IsNumber()
  totalLosses: number;

  @IsNumber()
  winRate: number;

  @IsString()
  bestStrategy: string;

  @IsNumber()
  averageProfit: number;

  @IsNumber()
  averageLoss: number;
}