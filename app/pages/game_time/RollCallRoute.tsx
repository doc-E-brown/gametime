import { GameState } from "./context";
import { RollCall } from "./RollCall";

export default function RollCallRoute() {
    const defaultState: GameState = {
        players: [
            { name: 'Player 1', timePlayed: 0, status: 'isUnavailable' },
            { name: 'Player 2', timePlayed: 0, status: 'isUnavailable' },
            { name: 'Player 3', timePlayed: 0, status: 'isUnavailable' },
        ],
        playersOnField: 3,
        isGamePlaying: false,
        gameStage: 'pre-game',
    }
    return (<RollCall defaultState={defaultState} />)
}
