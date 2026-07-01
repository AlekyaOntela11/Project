import express from "express";
import cors from "cors";

import shapeRoutes from "./routes/shapeRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Shape Builder API Running");

});

app.use("/api/shapes", shapeRoutes);

export default app;