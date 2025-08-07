import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConfirmationResponseDto {
    @IsNotEmpty()
    @IsString()
    journalId: string;

    @IsNotEmpty()
    @IsString()
    stepId: string;

    @IsNotEmpty()
    @IsBoolean()
    followed: boolean;

    @IsOptional()
    @IsString()
    notes?: string;
}