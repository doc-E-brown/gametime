import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Reserve } from './Reserve'
import { PlayerState } from '../../data'

const players: PlayerState[] = [
  {
    player: { name: 'Player2', id: 'p2' },
    status: 'isReserve',
    subOffTime: 0,
    timePlayed: 5,
    timesAsSub: 0,
  },
  {
    player: { name: 'Player1', id: 'p1' },
    status: 'isReserve',
    subOffTime: 1,
    timePlayed: 3,
    timesAsSub: 0,
  },
  {
    player: { name: 'Player4', id: 'p4' },
    status: 'isReserve',
    subOffTime: 2,
    timePlayed: 2,
    timesAsSub: 0,
  },
  {
    player: { name: 'Player3', id: 'p3' },
    status: 'isReserve',
    subOffTime: 3,
    timePlayed: 4,
    timesAsSub: 0,
  },
]

describe('ReserveComponent', () => {
  it('should correctly order the players using default sort', () => {
    render(<Reserve playerStates={players} onKeeperAction={() => {}} onFieldAction={() => {}} />)

    const names: string[] = screen.getAllByTestId('player-card-name').map((el: HTMLDivElement) => {
      // @ts-ignore
      return el.textContent
    })
    expect(names).toEqual(['Player2', 'Player1', 'Player4', 'Player3'])
  })

  it('should correctly order the players using timePlayed sort', () => {
    render(
      <Reserve
        playerStates={players}
        onKeeperAction={() => {}}
        onFieldAction={() => {}}
        sortMode="timePlayed"
      />,
    )

    const names: string[] = screen.getAllByTestId('player-card-name').map((el: HTMLDivElement) => {
      // @ts-ignore
      return el.textContent
    })
    expect(names).toEqual(['Player4', 'Player1', 'Player3', 'Player2'])
  })
})
