import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { JournalEntry } from '../journals/journal-entry.entity';
import { ConfirmationStep } from '../strategies/confirmation-step.entity';

@Entity()
export class ConfirmationResponse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => JournalEntry, journalEntry => journalEntry.confirmationResponses, { onDelete: 'CASCADE' })
    journalEntry: JournalEntry;

    @ManyToOne(() => ConfirmationStep, confirmationStep => confirmationStep.responses, { onDelete: 'CASCADE' })
    step: ConfirmationStep;

    @Column({ default: false })
    followed: boolean;
}
