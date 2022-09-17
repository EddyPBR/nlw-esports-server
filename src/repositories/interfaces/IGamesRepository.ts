import type { Game, Ad } from "@prisma/client";

export interface IGamesRepository {
  get: () => Promise<(Game & { ads: Ad[] })[]>;
}
