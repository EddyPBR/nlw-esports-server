import { IAdsRepository } from "repositories/interfaces/IAdsRepository";
import { prisma } from "~databases/prisma";

export class PrismaAdsRepository implements IAdsRepository {
  async getByGameId(gameId: string) {
    return await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getDiscordByAdId(adId: string) {
    return await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });
  }
}
