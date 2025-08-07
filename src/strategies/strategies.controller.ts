import { Controller, Post, Get, Body, Param, UseGuards, Req, Delete, Put } from '@nestjs/common';
import { StrategiesService } from './strategies.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { Strategy } from './strategy.entity';
import { JWTAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateConfirmationStepDto } from './dto/create-confirmation-step.dto';
import { ConfirmationStep } from './confirmation-step.entity';

@Controller('strategies')
@UseGuards(JWTAuthGuard)
export class StrategiesController {
  constructor(private readonly strategiesService: StrategiesService) {}

  @Post()
  async create(@Body() createStrategyDto: CreateStrategyDto): Promise<Strategy> {
    return this.strategiesService.createStrategy(createStrategyDto);
  }

  @Get()
  async findAll(@Req() req: any): Promise<Strategy[]> {
    const userId = req.user.id;
    return this.strategiesService.getAllStrategies(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Strategy> {
    return this.strategiesService.getStrategyById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStrategyDto: Partial<CreateStrategyDto>): Promise<Strategy> {
    return this.strategiesService.updateStrategy(id, updateStrategyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.strategiesService.deleteStrategy(id);
  }

  @Post('confirmation-step')
  async createConfirmationStep(@Body() createConfirmationStepDto: CreateConfirmationStepDto[]): Promise<ConfirmationStep[]> {
    return this.strategiesService.createConfirmationStep(createConfirmationStepDto);
  }

  @Get('confirmation-steps/:strategyId')
  async getConfirmationSteps(@Param('strategyId') strategyId: string): Promise<ConfirmationStep[]> {
    return this.strategiesService.getConfirmationStepsByStrategyId(strategyId);
  }

  @Delete('confirmation-step/:id')
  async deleteConfirmationStep(@Param('id') id: string): Promise<void> {
    return this.strategiesService.deleteConfirmationStep(id);
  }
}