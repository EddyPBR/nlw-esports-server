export interface IAdsRepository {
  getByGameId: (gameId: string) => Promise<
    {
      id: string;
      name: string;
      weekDays: string;
      useVoiceChanner: boolean;
      yearsPlaying: number;
      hourStart: number;
      hourEnd: number;
    }[]
  >;
}
