import express from "express";
import { AppDataSource } from "../database";
import { ComplexShape } from "../entity/ComplexShape";

const router = express.Router();
const repo = AppDataSource.getRepository(ComplexShape);

// GET ALL
router.get("/", async (req, res) => {
  const data = await repo.find({
    relations: ["shape1", "shape2"]
  });

  console.log("COMPLEX SHAPES API RESPONSE:", data); // 👈 ADD THIS

  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      label,
      shape1Id,
      shape2Id,
      operation,
      offset
    } = req.body;

    // validate minimal input
    if (!label || !shape1Id || !shape2Id || !operation) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const item = repo.create({
      label,
      shape1Id: Number(shape1Id),
      shape2Id: Number(shape2Id),
      operation,
      offset: Number(offset || 0)
    });

    const saved = await repo.save(item);

    res.json(saved);

  } catch (err: any) {
    console.error("CREATE ERROR:", err);

    res.status(500).json({
      error: err.message || "Failed to create complex shape"
    });
  }
});
export default router;