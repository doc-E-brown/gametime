import { PlayerState } from './player'

export type GameState = {
  playerStates: PlayerState[]
  playersOnField: number
  isGamePlaying: boolean
}
