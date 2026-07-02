import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Shape } from "./Shape";
export type Operation = "ADD" | "SUBTRACT" | "INTERSECT";

@Entity("complex_shapes")
export class ComplexShape {

    @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @Column()
  shape1Id!: number;

  @Column()
  shape2Id!: number;

  @ManyToOne(() => Shape, { eager: true })
  @JoinColumn({ name: "shape1Id" })
  shape1!: Shape;

  @ManyToOne(() => Shape, { eager: true })
  @JoinColumn({ name: "shape2Id" })
  shape2!: Shape;

  @Column()
  operation!: string;

  @Column({ default: 0 })
  offset!: number;
}