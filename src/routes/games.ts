import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { PrismaGamesRepository } from "~repositories/prisma/PrismaGamesRepository";
import { GetHighlightedGamesUseCase } from "~useCases/GetHighlightedGamesUseCase";
import { GetAdsByGameUseCase } from "~useCases/GetAdsByGameUseCase";
import { PrismaAdsRepository } from "~repositories/prisma/PrismaAdsRepository";
import { convertStringToMinute } from "~utils/convertHourStringToMinutes";
import { CreateAdUseCase } from "~useCases/CreateAdUseCase";
import { convertMinutesToHourString } from "~utils/convertMinutesToHourString";

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
    const gameId = request.params.gameId;

    const prismaAdsRepository = new PrismaAdsRepository();

    const getAdsByGameUseCase = new GetAdsByGameUseCase(prismaAdsRepository);

    const gameAds = await getAdsByGameUseCase.handle(gameId);

    const formattedGameAds = gameAds.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
    }));

    return response.status(200).json(formattedGameAds);
  }
);

router.post(
  "/:gameId/ads",
  celebrate({
    params: {
      gameId: Joi.string().not().empty().required(),
    },
    body: {
      name: Joi.string().required(),
      yearsPlaying: Joi.number().required(),
      discord: Joi.string().required(),
      weekDays: Joi.array().items(Joi.number()).required(),
      hourStart: Joi.string().not().empty().min(5).max(5).required(),
      hourEnd: Joi.string().not().empty().min(5).max(5).required(),
      useVoiceChannel: Joi.boolean().required(),
    },
  }),
  async (request, response) => {
    const gameId = request.params.gameId;
    const body = request.body as {
      name: string;
      yearsPlaying: number;
      discord: string;
      weekDays: number[];
      hourStart: string;
      hourEnd: string;
      useVoiceChannel: boolean;
    };

    const data = {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertStringToMinute(body.hourStart),
      hourEnd: convertStringToMinute(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    };

    const prismaAdsRepository = new PrismaAdsRepository();

    const createAdUseCase = new CreateAdUseCase(prismaAdsRepository);

    const ad = await createAdUseCase.handle(data);

    response.status(202).json({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    });
  }
);

export { router };
