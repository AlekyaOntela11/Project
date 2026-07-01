import { Router } from "express";
import {
    getShapes,
    getShapeById,
    createShape,
    updateShape,
    deleteShape
} from "../controllers/shapeController";

const router = Router();

router.get("/", getShapes);
router.get("/:id", getShapeById);
router.post("/", createShape);
router.put("/:id", updateShape);
router.delete("/:id", deleteShape);

export default router;