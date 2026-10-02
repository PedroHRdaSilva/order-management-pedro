import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota base
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API Order Management a rodar!" });
});

app.listen(PORT, () => {
  console.log(`Hello Mundao http://localhost:${PORT}`);
});
