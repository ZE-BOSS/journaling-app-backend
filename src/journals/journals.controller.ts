import { Controller, Post, Get, Body, Param, UseGuards, Req, Put } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { JWTAuthGuard } from '../common/guards/jwt-auth.guard';
import { JournalEntry } from './journal-entry.entity';
import { CreateConfirmationResponseDto } from './dto/create-confirmation-response.dto';
import { ConfirmationResponse } from './confirmation-response.entity';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async create(@Body() createJournalEntryDto: CreateJournalEntryDto): Promise<JournalEntry> {
    return this.journalsService.createJournalEntry(createJournalEntryDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  async findAll(@Req() req): Promise<JournalEntry[]> {
    const userId = req.user.id;
    return this.journalsService.getJournalEntries(userId);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JournalEntry> {
    return this.journalsService.getJournalEntryById(id);
  }

  @UseGuards(JWTAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateJournalEntryDto: Partial<CreateJournalEntryDto>): Promise<JournalEntry> {
    return this.journalsService.updateJournalEntry(id, updateJournalEntryDto);
  }

  @UseGuards(JWTAuthGuard)
  @Post('confirmation')
  async createConfirmation(@Body() confirmation: CreateConfirmationResponseDto[]): Promise<ConfirmationResponse[]> {
    return this.journalsService.createConfirmationResponse(confirmation);
  }

  @UseGuards(JWTAuthGuard)
  @Put('confirmation/:id')
  async updateConfirmation(@Param('id') id: string, @Body() updateData: Partial<CreateConfirmationResponseDto>): Promise<ConfirmationResponse> {
    return this.journalsService.updateConfirmationResponse(id, updateData);
  }
}