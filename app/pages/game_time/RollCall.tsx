import { useState } from "react";
import {GameContextCookie, GameState} from "./context";
import {PlayerStateRow} from "~/pages/game_time/PlayerStateRow.tsx";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router";
import { PlayerCard } from "./PlayerCard";

export function RollCall({defaultState}: {defaultState: GameState}) {
    const [gameState, setGameState] = useState<GameState>(defaultState);
    const [ , setGameContextCookie, removeGameContextCookie ] = useCookies<typeof GameContextCookie, GameState>([GameContextCookie])
    const navigate = useNavigate()

    const onClick = (name: string) => {
        // Get the player from the roster
        let player = gameState.players.find((player) => player.name == name)
        if (!player) return

        // Mark if the player is available
        if (player.status == 'isUnavailable') {
            player.status = 'isSub'
        } else {
            player.status = 'isUnavailable'
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

    const prepareTeam = () => {
        removeGameContextCookie(GameContextCookie)
        setGameContextCookie(GameContextCookie, gameState)
        navigate('/game_time/in_game')
    }

    return (
        <div>
            <h1>Update Availability</h1>
            {
                gameState.players.map((player) => {
                    return(<PlayerCard player={player} key={player.name}/>)
                    // return (<PlayerStateRow
                    //     player={player}
                    //     onClick={() => onClick(player.name)}
                    //     key={player.name}
                    // />)
                })
            }
            <div>
                <button onClick={prepareTeam}>Prepare Team</button>
            </div>
        </div>
    )


}
