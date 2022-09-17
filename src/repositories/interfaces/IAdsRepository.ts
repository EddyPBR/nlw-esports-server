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
}
