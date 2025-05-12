import { GameState, PlayerState } from '../data'

export type UpdateClocksProps = {
  clock: number
  gameState: GameState
  deltaTime: number
}

export type UpdateClockReturn = {
  gameState: GameState
  clock: number
}

export function UpdateClocks({
  clock,
  gameState,
  deltaTime,
}: UpdateClocksProps): UpdateClockReturn {
  const newClock = clock + deltaTime

  const newGameState = {
    ...gameState,
    players: gameState.playerStates.map((state: PlayerState) => {
      return {
        ...state,
        timePlayed: state.status === 'isOnField' ? state.timePlayed + deltaTime : state.timePlayed,
      }
    }),
  }

  return {
    gameState: newGameState,
    clock: newClock,
  }
}
