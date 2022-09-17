import { Router } from "express";
import { PrismaGamesRepository } from "~repositories/prisma/PrismaGamesRepository";
import { GetHighlightedGamesUseCase } from "~useCases/GetHighlightedGamesUseCase";

const router = Router();

router.get("/", async (_request, response) => {
  const prismaGamesRepository = new PrismaGamesRepository();

  const getHighlightedGamesUseCase = new GetHighlightedGamesUseCase(
    prismaGamesRepository
  );

  const highlightedGames = await getHighlightedGamesUseCase.handle();

  return response.status(200).json(highlightedGames);
});

export { router };
