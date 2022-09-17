import { IAdsRepository } from "repositories/interfaces/IAdsRepository";
import { prisma } from "~databases/prisma";

export class PrismaAdsRepository implements IAdsRepository {
  async getByGameId(gameId: string) {
    return await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChanner: true,
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
}
