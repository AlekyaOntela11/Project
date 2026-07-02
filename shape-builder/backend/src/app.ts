import express from "express";
import cors from "cors";

import shapeRoutes from "./routes/shapeRoutes";
import complexShapeRoutes from "./routes/complexShapeRoutes";


const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Shape Builder API Running");

});
app.use("/api/complex-shapes", complexShapeRoutes);
app.use("/api/shapes", shapeRoutes);

export default app;