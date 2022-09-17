import { Router } from "express";
import { router as gamesRoutes } from "~routes/games";

const router = Router();

router.use("/games", gamesRoutes);

export { router };
