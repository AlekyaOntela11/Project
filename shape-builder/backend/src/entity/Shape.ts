import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("shapes")
export class Shape {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    label!: string;

    @Column()
    shape!: string;

    @Column()
    color!: string;

    @Column()
    size!: number;
}