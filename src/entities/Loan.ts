import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.loans)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @ManyToOne(() => Book, (book) => book.loans)
    @JoinColumn({ name: 'bookId' })
    book!: Book;

    @Column({ type: 'date' })
    loanDate!: Date;
    
    @Column({ type: 'date', nullable: true })
    returnDate!: Date | null;

    @Column({ type: 'boolean', default: false })
    isReturned!: boolean;
}