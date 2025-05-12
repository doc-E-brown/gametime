import { GameState, Player, PlayerStatus } from '../data'

export default function ChangePlayerStatus(
  gameState: GameState,
  player: Player,
  status: PlayerStatus,
): GameState {
  return {
    ...gameState,
    playerStates: gameState.playerStates.map((state) => {
      if (state.player === player) {
        return {
          ...state,
          status,
          subOffTime: status === 'isReserve' ? new Date().getTime() : state.subOffTime,
          timesAsSub: status === 'isReserve' ? state.timesAsSub + 1 : state.timesAsSub,
        }
      }
      return state
    }),
  }
}
