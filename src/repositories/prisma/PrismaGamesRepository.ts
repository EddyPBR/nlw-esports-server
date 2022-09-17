import { IGamesRepository } from "repositories/interfaces/IGamesRepository";
import { prisma } from "~databases/prisma";

export class PrismaGamesRepository implements IGamesRepository {
  async get() {
    return await prisma.game.findMany({
      include: {
        ads: true,
      },
    });
  }
}
