import { PlayerState, TeamConfiguration } from 'app/data'

export function isFieldFull(
  playerStates: PlayerState[],
  configuration: TeamConfiguration,
): boolean {
  const playersOnField = playerStates.filter((state) => state.status === 'isOnField').length
  return playersOnField >= configuration.playersOnField
}

export function isKeeperAssigned(
  playerStates: PlayerState[],
  configuration: TeamConfiguration,
): boolean {
  if (!configuration.playWithKeeper) {
    return true
  }
  return playerStates.some((state) => state.status === 'isKeeper')
}
