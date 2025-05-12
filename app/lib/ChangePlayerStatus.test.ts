import { describe, expect, it } from 'vitest'
import ChangePlayerStatus from '../lib/ChangePlayerStatus.ts'
import { GameState } from '../data'

describe('ChangePlayerStatus', () => {
  it('should update player status correctly', () => {
    const initialGameState: GameState = {
      playerStates: [
        {
          player: { name: 'Player1', id: 'player1' },
          status: 'isKeeper',
          timePlayed: 0,
          timesAsSub: 0,
          subOffTime: 0,
        },
        {
          player: { name: 'Player2', id: 'player2' },
          status: 'isReserve',
          timePlayed: 0,
          timesAsSub: 0,
          subOffTime: 0,
        },
      ],
      playersOnField: 0,
      isGamePlaying: false,
    }

    const newGameState = ChangePlayerStatus(
      initialGameState,
      { name: 'Player2', id: 'player2' },
      'isKeeper',
    )
    expect(newGameState.playerStates[1].status).toBe('isKeeper')
  })
})
