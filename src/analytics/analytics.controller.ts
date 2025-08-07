import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SummaryDto } from './dto/summary.dto';
import { StrategyPerformanceDto } from './dto/strategy-performance.dto';
import { JWTAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JWTAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  async getSummary(@Req() req): Promise<SummaryDto> {
    const userId = req.user.id;
    return this.analyticsService.getSummary(userId);
  }

  @Get('by-strategy')
  async getPerformanceByStrategy(@Req() req): Promise<StrategyPerformanceDto[]> {
    const userId = req.user.id;
    return this.analyticsService.getPerformanceByStrategy(userId);
  }

  @Get('win-loss-ratio')
  async getWinLossRatio(@Req() req): Promise<{ win: number; loss: number }> {
    const userId = req.user.id;
    return this.analyticsService.getWinLossRatio(userId);
  }
}