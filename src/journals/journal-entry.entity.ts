import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Strategy } from '../strategies/strategy.entity';
import { ConfirmationResponse } from './confirmation-response.entity';

@Entity()
export class JournalEntry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.journalEntries, { eager: true })
    user: User;

    @ManyToOne(() => Strategy, strategy => strategy.id, { eager: true })
    strategy: Strategy;

    @Column()
    currencyPair: string;

    @Column('decimal', { precision: 16, scale: 8 })
    entryLevel: number;

    @Column('decimal', { precision: 16, scale: 8 })
    exitLevel: number;

    @Column('decimal', { precision: 16, scale: 8 })
    lotSize: number;

    @Column('decimal', { precision: 16, scale: 8 })
    startingBalance: number;

    @Column('decimal', { precision: 16, scale: 8 })
    closingBalance: number;

    @Column()
    signalType: 'Buy' | 'Sell';

    @Column('decimal', { precision: 16, scale: 8 })
    profit: number;

    @Column('text')
    notes: string;
    
    @Column()
    audioNote: string;

    @Column('text', { array: true, nullable: true })
    mediaFiles: string[];

    @OneToMany(() => ConfirmationResponse, response => response.journalEntry, { cascade: true })
    confirmationResponses: ConfirmationResponse[];

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
