import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
}  from 'typeorm';

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

    @CreateDateColumn()
    createdAt!: Date;
}