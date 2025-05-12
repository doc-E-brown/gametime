import { PlayerState } from './player.ts'

export type GameState = {
  playerStates: PlayerState[]
  playersOnField: number
  isGamePlaying: boolean
}
