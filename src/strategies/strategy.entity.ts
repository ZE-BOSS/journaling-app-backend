import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ConfirmationStep } from './confirmation-step.entity';
import { User } from '../users/user.entity';
import { JournalEntry } from '../journals/journal-entry.entity';

@Entity()
export class Strategy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.strategies, { eager: true })
  user: User;

  @OneToMany(() => ConfirmationStep, cs => cs.strategy, { cascade: true })
  confirmationSteps: ConfirmationStep[];

  @OneToMany(() => JournalEntry, journal => journal.strategy)
  journals: JournalEntry[];

  @Column()
  name: string;

  @Column('text')
  description: string;
}
