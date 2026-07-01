import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Shape } from "./Shape";

@Entity("complex_shapes")
export class ComplexShape {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    label!: string;

    @ManyToOne(() => Shape)
    @JoinColumn({ name: "shape1Id" })
    shape1!: Shape;

    @ManyToOne(() => Shape)
    @JoinColumn({ name: "shape2Id" })
    shape2!: Shape;

    @Column()
    operation!: string;

    @Column({ default: 0 })
    offset!: number;
}