import {GameState, PlayerState} from '../pages/context'

export type UpdateClocksProps = {
    clock: number,
    gameState: GameState,
    deltaTime: number
}

export type UpdateClockReturn = {
    gameState: GameState,
    clock: number
}

export function UpdateClocks({clock, gameState, deltaTime} : UpdateClocksProps) : UpdateClockReturn {
    const newClock = clock + deltaTime

    const newGameState = {
        ...gameState,
        players: gameState.players.map((player: PlayerState) => {
            return {
                ...player,
                timePlayed:
                    player.status === "isOnField"
                        ? player.timePlayed + deltaTime
                        : player.timePlayed,
            };
        }),
    }

    return {
        gameState: newGameState,
        clock: newClock
    }
}
