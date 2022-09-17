import express from "express";
import cors from "cors";
import "express-async-errors";

import { router } from "~routes/apiV1";
import { errorHandler } from "~middlewares/errorHandler";

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);

export { app };
