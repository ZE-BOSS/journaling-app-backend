import { Module } from '@nestjs/common';
import { StrategiesService } from './strategies.service';
import { StrategiesController } from './strategies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from './strategy.entity';
import { ConfirmationStep } from './confirmation-step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy, ConfirmationStep])],
  providers: [StrategiesService],
  controllers: [StrategiesController],
  exports: [StrategiesService],
})
export class StrategiesModule {}