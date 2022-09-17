import { IAdsRepository } from "~repositories/interfaces/IAdsRepository";

export class CreateAdUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async handle(data: {
    gameId: string;
    name: string;
    yearsPlaying: number;
    discord: string;
    weekDays: string;
    hourStart: number;
    hourEnd: number;
    useVoiceChannel: boolean;
  }) {
    return await this.adsRepository.createAd(data);
  }
}
