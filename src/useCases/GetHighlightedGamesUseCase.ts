import { IGamesRepository } from "~repositories/interfaces/IGamesRepository";

export class GetHighlightedGamesUseCase {
  constructor(private gamesRepository: IGamesRepository) {}

  async handle() {
    return await this.gamesRepository.get();
  }
}
