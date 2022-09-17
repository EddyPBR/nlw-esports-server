export interface IGamesRepository {
  get: () => Promise<
    {
      id: string;
      title: string;
      bannerUrl: string;
      ads: {
        id: string;
        name: string;
        yearsPlaying: number;
        discord: string;
        weekDays: string;
        hourStart: number;
        hourEnd: number;
        useVoiceChannel: boolean;
        createdAt: Date;
        gameId: string;
      }[];
    }[]
  >;
}
