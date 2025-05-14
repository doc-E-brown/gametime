import { Match, PlayerState } from '../data'

export type UpdateClocksProps = {
  clock: number
  gameState: Match
  deltaTime: number
}

export type UpdateClockReturn = {
  gameState: Match
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
