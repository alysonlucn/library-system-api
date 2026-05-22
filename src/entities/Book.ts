import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
}  from 'typeorm';
import { Loan } from './Loan';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    author!: string;

    @Column({ default: true })
    available!: boolean;

    @OneToMany(() => Loan, (loan) => loan.book)
    loans!: Loan[];

    @CreateDateColumn()
    createdAt!: Date;
}