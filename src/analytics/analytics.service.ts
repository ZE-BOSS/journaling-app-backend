import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { JournalEntry } from '../journals/journal-entry.entity';
import { Strategy } from '../strategies/strategy.entity';
import { User } from '../users/user.entity';
import { SummaryDto } from './dto/summary.dto';
import { StrategyPerformanceDto } from './dto/strategy-performance.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getSummary(userId: string): Promise<SummaryDto> {
    const entries = await this.journalEntryRepository.find({ where: { user: { id: userId } } });
    const totalTrades = entries.length;
    const totalWins = await this.journalEntryRepository
      .createQueryBuilder('journal')
      .select('SUM(journal.profit)', 'totalProfit')
      .where('journal.user.id = :userId', { userId })
      .getRawOne();
    const totalLosses = await this.journalEntryRepository
      .createQueryBuilder('journal')
      .select('SUM(journal.profit)', 'totalLoss')
      .where('journal.user.id = :userId', { userId })
      .andWhere('journal.profit < 0')
      .getRawOne();
    const winRate = entries.length > 0 ? (entries.filter(entry => entry.profit > 0).length / entries.length) * 100 : 0;
    const bestStrategy = await this.journalEntryRepository
      .createQueryBuilder('journal')
      .select('journal.strategyId', 'strategyId')
      .addSelect('SUM(journal.profit)', 'totalProfit')
      .where('journal.user.id = :userId', { userId })
      .groupBy('journal.strategy.id')
      .getRawOne();
    const bestStrategyName = (await this.strategyRepository.findOne({ where: { id: bestStrategy.strategyId } })).name || 'None'
    const averageLoss = totalLosses.totalLoss / totalTrades;
    const averageProfit = totalWins.totalProfit / totalTrades;

    return {
      totalTrades,
      totalWins: totalWins.totalProfit || 0,
      totalLosses: totalLosses.totalLoss || 0,
      winRate,
      bestStrategy: bestStrategyName,
      averageLoss: averageLoss || 0,
      averageProfit: averageProfit || 0,
    };
  }

  async getPerformanceByStrategy(userId: string): Promise<StrategyPerformanceDto[]> {
    const strategies = await this.strategyRepository.find({ where: { user: { id: userId } } });
    const performanceData: StrategyPerformanceDto[] = [];

    for (const strategy of strategies) {
      const entries = await this.journalEntryRepository.find({ where: { strategy: { id: strategy.id } } });
      const totalProfit = await this.journalEntryRepository
        .createQueryBuilder('journal')
        .select('SUM(journal.profit)', 'totalProfit')
        .where('journal.strategy.id = :strategyId', { strategyId: strategy.id })
        .getRawOne() || 0;
      const winRate = entries.length > 0 ? (entries.filter(entry => entry.profit > 0).length / entries.length) * 100 : 0;
      const averageProfit = entries.length > 0 ? totalProfit.totalProfit / entries.length : 0;
      const totalLosses = await this.journalEntryRepository
        .createQueryBuilder('journal')
        .select('SUM(journal.profit)', 'totalLoss')
        .where('journal.strategy.id = :strategyId', { strategyId: strategy.id })
        .andWhere('journal.profit < 0')
        .getRawOne();
      const averageLoss = totalLosses.totalLoss / entries.length || 0;

      performanceData.push({
        totalTrades: entries.length,
        strategyId: strategy.id,
        averageProfit,
        averageLoss,
        totalLoss: totalLosses.totalLoss || 0,
        strategyName: strategy.name,
        totalProfit: totalProfit.totalProfit || 0,
        winRate,
      });
    }

    return performanceData;
  }

  async getWinLossRatio(userId: string): Promise<{ win: number; loss: number }> {
    const wins = await this.journalEntryRepository.count({
      where: { user: { id: userId }, profit: MoreThan(0) },
    });
    const losses = await this.journalEntryRepository.count({
      where: { user: { id: userId }, profit: LessThan(0) },
    });

    return { win: wins, loss: losses };
  }
}