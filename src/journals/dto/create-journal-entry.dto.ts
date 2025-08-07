import { IsNotEmpty, IsNumber, IsString, IsEnum, IsArray } from 'class-validator';

export class CreateJournalEntryDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    currencyPair: string;

    @IsNotEmpty()
    @IsNumber()
    entryLevel: number;

    @IsNotEmpty()
    @IsNumber()
    exitLevel: number;

    @IsNotEmpty()
    @IsNumber()
    lotSize: number;

    @IsNotEmpty()
    @IsNumber()
    startingBalance: number;

    @IsNotEmpty()
    @IsNumber()
    closingBalance: number;

    @IsNotEmpty()
    @IsEnum(['Buy', 'Sell'])
    signalType: 'Buy' | 'Sell';

    @IsNotEmpty()
    @IsString()
    strategyUsed: string;

    @IsNotEmpty()
    @IsString()
    notes: string;

    @IsNotEmpty()
    @IsString()
    audioNote: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    mediaFiles: string[];
}