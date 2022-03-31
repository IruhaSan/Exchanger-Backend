import { UUIDVersion } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true })
  patronymic?: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: true })
  skype?: string;

  @Column({ nullable: true })
  telegram?: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: false })
  authNotificationEmail?: boolean;

  @Column({ default: false })
  authNotificationTg?: boolean;

  @Column({ default: false })
  authNotificationSms?: boolean;

  @Column({ default: false })
  pinAuthSms?: boolean;

  @Column({ default: false })
  pinAuthTg?: boolean;

  @Column({ default: true })
  passwordRecovery?: boolean;

  @Column({ nullable: true })
  ipAddresses?: string;

  @Column({ nullable: true })
  token: string;
}
