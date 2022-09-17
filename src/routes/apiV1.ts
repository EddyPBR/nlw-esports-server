import { Router } from "express";
import { router as gamesRoutes } from "~routes/games";
import { router as adsRoutes } from "~routes/ads";

const router = Router();

router.use("/games", gamesRoutes);
router.use("/ads", adsRoutes);

export { router };
