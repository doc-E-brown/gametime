import {
    GameState,
    GameContextCookie,
    PlayerEvent,
    PlayerStatus,
    PlayerState
} from "./context";
import {useState} from 'react'
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router"
import {PlayerStateRow} from "./PlayerStateRow"

export type PrepareTeamProps = {
    defaultState: GameState
}

export function PrepareTeam({defaultState} : PrepareTeamProps){
    const [ gameContextCookie, setGameContextCookie ] = useCookies<typeof GameContextCookie, GameState>([GameContextCookie])
    const [gameState, setGameState] = useState<GameState>(gameContextCookie[GameContextCookie] ?? defaultState)
    const [ onFieldPlayers, setOnFieldPlayers ] = useState<string[]>(
        gameState.players.filter((player) => player.status == 'onField').map((player) => player.name)
    )
    const navigate = useNavigate()

    const onClick = (name: string) => {
        // Get the player from the roster
        let player = gameState.players.find((player) => player.name == name)
        if (!player) return

        // Mark if the player is available
        if (player.status == 'isUnavailable') {
            player.status = 'isSub' as PlayerStatus
        } else if (player.status == 'isSub' && onFieldPlayers.length < gameState.playersOnField) {
            player.status = 'onField' as PlayerStatus
            setOnFieldPlayers([...onFieldPlayers, name])
        } else if (player.status == 'onField' && onFieldPlayers.includes(name)) {
            player.status = 'isSub' as PlayerStatus
            setOnFieldPlayers(onFieldPlayers.filter(player => player !== name))
        }
        setGameState({
            ...gameState,
            players: gameState.players.map((p) => {
                if (p.name == name) {
                    return player
                }
                return p
            })
        })
    }

    const LineupSelected = () => {
        const playerEvents: PlayerEvent[] = onFieldPlayers.map((player) => ({
            type: 'start',
            playerName: player
        }))
        const newGameState = {
            ...gameState,
            players: gameState.players.map((player) => ({
                ...player,
                status: onFieldPlayers.includes(player.name) ? 'onField' : 'isSub' as PlayerStatus,
            }))
        }
        setGameState(newGameState)
        setGameContextCookie(GameContextCookie, newGameState)
        navigate('/game_time/keeper')
    }
    
    return (
        <div>
            <h1>Select Starting Lineup</h1>
            <div className="grid grid-cols-2 gap-4">
                {
                    gameState.players.map((player) => {
                        return (<PlayerStateRow
                            player={player}
                            onClick={() => onClick(player.name)}
                            key={player.name}
                        />)
                    })
                }
            </div>
            { onFieldPlayers.length == gameState.playersOnField &&
                <div>
                    <button onClick={LineupSelected}>Select Lineup</button>
                </div>
            }
        </div>
    )
}
