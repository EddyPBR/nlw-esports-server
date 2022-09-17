import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { PrismaGamesRepository } from "~repositories/prisma/PrismaGamesRepository";
import { GetHighlightedGamesUseCase } from "~useCases/GetHighlightedGamesUseCase";
import { GetAdsByGameUseCase } from "~useCases/GetAdsByGameUseCase";
import { PrismaAdsRepository } from "~repositories/prisma/PrismaAdsRepository";

const router = Router();

router.get("/", async (_request, response) => {
  const prismaGamesRepository = new PrismaGamesRepository();

  const getHighlightedGamesUseCase = new GetHighlightedGamesUseCase(
    prismaGamesRepository
  );

  const highlightedGames = await getHighlightedGamesUseCase.handle();

  return response.status(200).json(highlightedGames);
});

router.get(
  "/:gameId/ads",
  celebrate({
    params: {
      gameId: Joi.string().not().empty().required(),
    },
  }),
  async (request, response) => {
    const gameId = request.params.id;

    const prismaAdsRepository = new PrismaAdsRepository();

    const getAdsByGameUseCase = new GetAdsByGameUseCase(
      prismaAdsRepository
    );

    const gameAds = await getAdsByGameUseCase.handle(gameId);

    return response.status(200).json(gameAds);
  }
);

export { router };
