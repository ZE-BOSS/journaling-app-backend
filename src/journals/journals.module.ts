import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from './journal-entry.entity';
import { ConfirmationResponse } from './confirmation-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, ConfirmationResponse])],
  providers: [JournalsService],
  controllers: [JournalsController],
})
export class JournalsModule {}