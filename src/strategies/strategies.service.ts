import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from './strategy.entity';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { ConfirmationStep } from './confirmation-step.entity';
import { CreateConfirmationStepDto } from './dto/create-confirmation-step.dto';

@Injectable()
export class StrategiesService {
  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
    @InjectRepository(ConfirmationStep)
    private readonly confirmationStepRepository: Repository<ConfirmationStep>,
  ) {}

  async createStrategy(createStrategyDto: CreateStrategyDto): Promise<Strategy> {
    const strategy = this.strategyRepository.create({
      ...createStrategyDto,
      user: { id: createStrategyDto.userId },
    });
    return await this.strategyRepository.save(strategy);
  }

  async getAllStrategies(userId: string): Promise<Strategy[]> {
    return await this.strategyRepository.find({
      where: { user: { id: userId } },
      relations: ['confirmationSteps'],
    });
  }

  async getStrategyById(id: string): Promise<Strategy> {
    const strategy = await this.strategyRepository.findOne({ 
      relations: ['confirmationSteps'],
      where: { id } 
    });

    if (!strategy) throw new NotFoundException('Strategy not found');
    return strategy;
  }

  async updateStrategy(id: string, updateDto: Partial<CreateStrategyDto>) {
    await this.strategyRepository.update(id, updateDto);
    return this.getStrategyById(id);
  }

  async deleteStrategy(id: string): Promise<void> {
    const result = await this.strategyRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Strategy not found');
    await this.confirmationStepRepository.delete({ strategy: { id } });
  }

  async createConfirmationStep(
    createConfirmationStepDto: CreateConfirmationStepDto[],
  ): Promise<ConfirmationStep[]> {
    const confirmationSteps = createConfirmationStepDto.map(dto => {
      return this.confirmationStepRepository.create({
        ...dto,
        strategy: { id: dto.strategyId },
      });
    });
    return await this.confirmationStepRepository.save(confirmationSteps);
  }

  async getConfirmationStepsByStrategyId(strategyId: string): Promise<ConfirmationStep[]> {
    return await this.confirmationStepRepository.find({ where: { strategy: { id: strategyId } } });
  }

  async deleteConfirmationStep(id: string): Promise<void> {
    await this.confirmationStepRepository.delete(id);
  }
}