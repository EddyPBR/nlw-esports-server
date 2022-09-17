import { IAdsRepository } from "~repositories/interfaces/IAdsRepository";

export class GetDiscordByAdUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async handle(adId: string) {
    return await this.adsRepository.getDiscordByAdId(adId);
  }
}
