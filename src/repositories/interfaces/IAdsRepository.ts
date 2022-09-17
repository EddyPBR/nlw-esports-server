export interface IAdsRepository {
  getByGameId: (gameId: string) => Promise<
    {
      id: string;
      name: string;
      weekDays: string;
      useVoiceChannel: boolean;
      yearsPlaying: number;
      hourStart: number;
      hourEnd: number;
    }[]
  >;

  getDiscordByAdId: (adId: string) => Promise<{
    discord: string;
  }>;

  createAd: (ad: {
    gameId: string;
    name: string;
    yearsPlaying: number;
    discord: string;
    weekDays: string;
    hourStart: number;
    hourEnd: number;
    useVoiceChannel: boolean;
  }) => Promise<{
    id: string;
    gameId: string;
    name: string;
    yearsPlaying: number;
    discord: string;
    weekDays: string;
    hourStart: number;
    hourEnd: number;
    useVoiceChannel: boolean;
  }>;
}
