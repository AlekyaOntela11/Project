import "reflect-metadata";
import { DataSource } from "typeorm";
import { Shape } from "./entity/Shape";
import { ComplexShape } from "./entity/ComplexShape";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "shapes.db",
    synchronize: true,
    logging: false,
    entities: [
        Shape,
        ComplexShape
    ]
});