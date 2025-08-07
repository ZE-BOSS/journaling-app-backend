import { JournalEntry } from 'src/journals/journal-entry.entity';
import { Strategy } from 'src/strategies/strategy.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Strategy, strategy => strategy.user, { cascade: true })
  strategies: Strategy[];

  @OneToMany(() => JournalEntry, journal => journal.user, { cascade: true })
  journalEntries: JournalEntry[];

  @Column('json', {
    nullable: true,
    default: () => `'{"theme":"light","notificationsEnabled":true,"language":"en"}'`,
  })
  preferences: {
    theme?: string;
    notificationsEnabled?: boolean;
    language?: string;
  };
}
