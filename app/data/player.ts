import { v4 as uuidv4 } from 'uuid'
export type PlayerStatus = 'isOnField' | 'isReserve' | 'isKeeper' | 'isUnavailable'

export type Player = {
  name: string
  id: string
  shirtNumber?: number
}

export type PlayerState = {
  player: Player
  timePlayed: number
  status: PlayerStatus
  timesAsSub: number
  subOffTime: number
}

export function createPlayer(name: string, shirtNumber?: number): Player {
  return {
    name,
    id: uuidv4(),
    shirtNumber,
  }
}
