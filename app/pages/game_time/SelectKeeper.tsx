import {useCookies} from "react-cookie";
import {GameContextCookie, GameState} from "~/pages/game_time/context.ts";
import {useState} from "react";
import {useNavigate} from "react-router"
import { PlayerStateRow } from "./PlayerStateRow";

export function SelectKeeper() {
    const [ gameContextCookie, setGameContextCookie ] = useCookies<typeof GameContextCookie, GameState>([GameContextCookie])
    const [gameState, setGameState] = useState<GameState>(gameContextCookie[GameContextCookie])
    const [keeper, setKeeper] = useState<string | null>(null)
    const navigate = useNavigate()

    const onClick = (name: string) => {
        const player = gameState.players.find((player) => player.name === name)
        if(!player) return

        let newKeeper = null
        if (keeper !== name) {
            newKeeper = name
        }

        setGameState({
            ...gameState,
            players: gameState.players.map((p) => {
                return {
                    ...p,
                    status: newKeeper === p.name ? 'isKeeper' : 'onField'
                }
            })
        })
        setKeeper(newKeeper)
    }

    const onSelectKeeper = () => {
        if (keeper === null) return
        setGameContextCookie(GameContextCookie, gameState)
        navigate('/game_time/mid_game')
    }

    return(
        <div>
            <h1>Select Goal Keeper</h1>
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
            {keeper !== null && (
                <div>
                    <button onClick={onSelectKeeper}>Game Ready</button>
                </div>
            )}
        </div>
    )
}
