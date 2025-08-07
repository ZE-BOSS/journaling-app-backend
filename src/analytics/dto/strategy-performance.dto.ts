import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StrategyPerformanceDto {
  @IsNotEmpty()
  @IsString()
  strategyId: string;

  @IsNotEmpty()
  @IsString()
  strategyName: string;

  @IsNotEmpty()
  @IsNumber()
  totalTrades: number;

  @IsNotEmpty()
  @IsNumber()
  winRate: number;

  @IsNotEmpty()
  @IsNumber()
  averageProfit: number;

  @IsNotEmpty()
  @IsNumber()
  averageLoss: number;

  @IsNotEmpty()
  @IsNumber()
  totalProfit: number;

  @IsNotEmpty()
  @IsNumber()
  totalLoss: number;
}