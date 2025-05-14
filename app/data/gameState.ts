import { PlayerState } from './player'

export type Match = {
  playerStates: PlayerState[]
  playersOnField: number
  isGamePlaying: boolean
}
