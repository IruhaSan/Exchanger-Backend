import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BidStatusState } from '../bid.constants';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ nullable: true, default: BidStatusState.handling })
  status: string;

  @Column({ nullable: true })
  sum_to: number;

  @Column({ nullable: true })
  sum_from: number;

  @Column({ nullable: true })
  currency_to: string;

  @Column({ nullable: true })
  currency_from: string;

  @Column({ nullable: true })
  card_number: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  FCs: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  user_id: string;
}
