import { IAdsRepository } from "~repositories/interfaces/IAdsRepository";

export class GetAdsByGameUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async handle(gameId: string) {
    return await this.adsRepository.getByGameId(gameId);
  }
}
