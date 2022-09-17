import express from "express";
import cors from "cors";

import { errorHandler } from "~middlewares/errorHandler";

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  throw new Error("test")
  res.json({ message: "hello world" });
});

app.use(errorHandler);

export { app };
