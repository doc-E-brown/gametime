import { GameState } from '../../routes/context.ts'

export function isKeeperAssigned(gameState: GameState): boolean {
  return gameState.players.some((player) => player.status === 'isKeeper')
}

export function isFieldFull(gameState: GameState): boolean {
  return (
    gameState.players.filter((player) => player.status === 'isOnField').length >=
    gameState.playersOnField - 1
  )
}
