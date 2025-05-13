import { GameState } from '../../data'

export function isKeeperAssigned(gameState: GameState): boolean {
  return gameState.playerStates.some((state) => state.status === 'isKeeper')
}

export function isFieldFull(gameState: GameState): boolean {
  return (
    gameState.playerStates.filter((state) => state.status === 'isOnField').length >=
    gameState.playersOnField - 1
  )
}
