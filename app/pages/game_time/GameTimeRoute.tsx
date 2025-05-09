import type { Info } from './+types/GameTimeRoute'
import { PrepareTeam } from './PrepareTeam.tsx'
import {GameState, PlayerState} from './context'

const players: PlayerState[] = [
    { name: 'Player 1', timePlayed: 0, status: 'isUnavailable' },
    { name: 'Player 2', timePlayed: 0, status: 'isUnavailable' },
    { name: 'Player 3', timePlayed: 0, status: 'isUnavailable' },
]

export default function GameTimeRoute({path}: Info) {
    const defaultState: GameState = {
        players: players,
        playersOnField: 3,
        isGamePlaying: false,
        gameStage: 'pre-game',
    }
    return (
        <PrepareTeam defaultState={defaultState}/>
    )
}
