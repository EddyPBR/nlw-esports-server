import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { PrismaAdsRepository } from "~repositories/prisma/PrismaAdsRepository";
import { GetDiscordByAdUseCase } from "~useCases/GetDiscordByAdUseCase";

const router = Router();

router.get(
  "/:adId/discord",
  celebrate({
    params: {
      adId: Joi.string().not().empty().required(),
    },
  }),
  async (request, response) => {
    const adId = request.params.adId;

    const prismaAdsRepository = new PrismaAdsRepository();

    const getAdsByGameUseCase = new GetDiscordByAdUseCase(prismaAdsRepository);

    const discord = await getAdsByGameUseCase.handle(adId);

    return response.status(200).json(discord);
  }
);

export { router };
