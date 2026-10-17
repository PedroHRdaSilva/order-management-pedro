import express from "express";
import type { Request, Response } from "express";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API Order Management a rodar!" });
});

app.use(orderRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Hello Mundao http://localhost:${PORT}`);
});
