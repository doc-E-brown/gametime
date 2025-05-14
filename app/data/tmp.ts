import { Match } from './gameState'
import { Player, PlayerState } from './player'

function createPlayer(name: string): PlayerState {
  const player: Player = {
    name,
    id: name.toLowerCase(),
  }
  return {
    player,
    timePlayed: 0,
    status: 'isUnavailable',
    timesAsSub: 0,
    subOffTime: 0,
  }
}

export function getDefaultGameState(): Match {
  return {
    playerStates: [
      createPlayer('Ben'),
      createPlayer('Emmett'),
      createPlayer('Freddy'),
      // createPlayer('Harry'),
      // createPlayer('Hunter'),
      // createPlayer('Isaac'),
      // createPlayer('Lachy'),
      // createPlayer('Lawson'),
      // createPlayer('Lewis'),
      // createPlayer('Matthew'),
      // createPlayer('Robin'),
      // createPlayer('Sam'),
      // createPlayer('Tim'),
    ],
    playersOnField: 9,
    isGamePlaying: false,
  }
}
