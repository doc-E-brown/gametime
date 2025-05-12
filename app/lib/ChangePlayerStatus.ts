import { GameState, PlayerStatus } from "../pages/context.ts";

export default function ChangePlayerStatus(
  gameState: GameState,
  name: string,
  status: PlayerStatus,
): GameState {
  return {
    ...gameState,
    players: gameState.players.map((player) => {
      if (player.name === name) {
        return {
          ...player,
          status,
          subOffTime: status === "isReserve" ? new Date().getTime() : player.subOffTime,
          timesAsSub: status === "isReserve" ? player.timesAsSub + 1 : player.timesAsSub,
        };
      }
      return player;
    }),
  };
}
``
