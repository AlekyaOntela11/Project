import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Shape } from "../entity/Shape";
import { validateShape } from "../validation/shapeValidation";
import { ComplexShape } from "../entity/ComplexShape";

// GET ALL
export const getShapes = async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(Shape);
        const data = await repo.find();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ message: "DB error" });
    }
};

// GET BY ID
export const getShapeById = async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(Shape);
        const id = Number(req.params.id);

        const shape = await repo.findOne({ where: { id } });

        if (!shape) {
            return res.status(404).json({ message: "Shape not found" });
        }

        return res.json(shape);
    } catch {
        return res.status(500).json({ message: "Server Error" });
    }
};

// CREATE
export const createShape = async (req: Request, res: Response) => {
    try {
        
const validationError = validateShape(req.body);

console.log("Validation Result:", validationError);

if (validationError) {
    return res.status(400).json({
        message: validationError
    });
}





        const repo = AppDataSource.getRepository(Shape);

        const shape = repo.create(req.body);

        await repo.save(shape);

        return res.status(201).json(shape);

    } catch (error) {
    console.error("Create Shape Error:", error);

    return res.status(500).json({
        message: "Unable to create shape"
    });
}
};

// UPDATE
export const updateShape = async (req: Request, res: Response) => {
    try {
        const validationError = validateShape(req.body);

        if (validationError) {

            return res.status(400).json({

                message: validationError

            });

        }
        const repo = AppDataSource.getRepository(Shape);
        const id = Number(req.params.id);

        const shape = await repo.findOne({ where: { id } });

        if (!shape) {
            return res.status(404).json({ message: "Shape not found" });
        }

        repo.merge(shape, req.body);
        const result = await repo.save(shape);

        return res.json(result);
    } catch {
        return res.status(500).json({ message: "Update failed" });
    }
};

// DELETE
export const deleteShape = async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.id);
    console.log("ID RECEIVED:", id);

    const shapeRepo = AppDataSource.getRepository(Shape);
    const complexRepo = AppDataSource.getRepository(ComplexShape);

    // Check if shape exists
    const shape = await shapeRepo.findOneBy({ id });
    console.log("FOUND SHAPE:", shape);

    if (!shape) {
      return res.status(404).json({ message: "Shape not found" });
    }

    // IMPORTANT: remove dependencies first
    console.log("Deleting related complex shapes...");
    await complexRepo.delete({ shape1: { id } });
    await complexRepo.delete({ shape2: { id } });

    console.log("Deleting shape...");
    const result = await shapeRepo.delete(id);

    console.log("DELETE RESULT:", result);

    return res.json({ message: "Deleted successfully", result });

  } catch (err) {
    console.error("🔥 FULL BACKEND ERROR:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      message: "Delete failed",
      error: errorMessage
    });
  }
};