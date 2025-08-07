import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Strategy } from './strategy.entity';
import { ConfirmationResponse } from '../journals/confirmation-response.entity';

@Entity()
export class ConfirmationStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Strategy, strategy => strategy.confirmationSteps)
  strategy: Partial<Strategy>;

  @OneToMany(() => ConfirmationResponse, response => response.step, { cascade: true })
  responses: ConfirmationResponse[];

  @Column()
  title: string;

  @Column('text')
  description: string;
}
