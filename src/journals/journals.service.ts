import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalEntry } from './journal-entry.entity';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { ConfirmationResponse } from './confirmation-response.entity';
import { CreateConfirmationResponseDto } from './dto/create-confirmation-response.dto';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(JournalEntry)
    private journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ConfirmationResponse)
    private confirmationResponseRepository: Repository<ConfirmationResponse>,
  ) {}

  async createJournalEntry(createJournalEntryDto: CreateJournalEntryDto): Promise<JournalEntry> {
    const { userId, strategyUsed, ...entryData } = createJournalEntryDto;
    const journalEntry = this.journalEntryRepository.create({
      ...entryData,
      user: { id: userId },
      strategy: { id: strategyUsed },
    });
    return this.journalEntryRepository.save(journalEntry);
  }

  async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    return this.journalEntryRepository.find({ where: { user: { id: userId } } });
  }

  async getJournalEntryById(id: string): Promise<JournalEntry> {
    return this.journalEntryRepository.findOne({
      where: { id }, 
      relations: ['strategy', 'confirmationResponses', 'confirmationResponses.step'], 
    });
  }

  async updateJournalEntry(id: string, updateJournalEntryDto: Partial<CreateJournalEntryDto>): Promise<JournalEntry> {
    await this.journalEntryRepository.update(id, updateJournalEntryDto);
    return this.getJournalEntryById(id);
  }

  async createConfirmationResponse(createConfirmationResponseDto: CreateConfirmationResponseDto[]): Promise<ConfirmationResponse[]> {
    const confirmationResponses = createConfirmationResponseDto.map(dto => {
      const { journalId, stepId, ...responseData } = dto;
      return this.confirmationResponseRepository.create({
        ...responseData,
        journalEntry: { id: journalId },
        step: { id: stepId },
      });
    });
    return this.confirmationResponseRepository.save(confirmationResponses);
  }

  async updateConfirmationResponse(id: string, updateData: Partial<CreateConfirmationResponseDto>): Promise<ConfirmationResponse> {
    const { journalId, stepId, ...update } = updateData;
   
    await this.confirmationResponseRepository.update(id, update);
    return this.confirmationResponseRepository.findOne({ where: { id }, relations: [ 'step' ] });
  }
}