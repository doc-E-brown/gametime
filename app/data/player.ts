export type PlayerStatus = 'isOnField' | 'isReserve' | 'isKeeper' | 'isUnavailable'

export type Player = {
  name: string
  id: string
}

export type PlayerState = {
  player: Player
  timePlayed: number
  status: PlayerStatus
  timesAsSub: number
  subOffTime: number
}
