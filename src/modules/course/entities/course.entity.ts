import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Bill } from '@modules/bill/entities/bill.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  slb: number;

  // @Column()
  // formattedPrice: string;
  
}
