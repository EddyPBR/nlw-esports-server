import express from "express";
import cors from "cors";

import { errorHandler } from "~middlewares/errorHandler";
import { Joi, celebrate } from "celebrate";

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json());

app.get("/", celebrate({
  query: {
    name: Joi.string().required(),
  }
}), (req, res) => {
  throw new Error("test")
  res.json({ message: "hello world" });
});

app.use(errorHandler);

export { app };
