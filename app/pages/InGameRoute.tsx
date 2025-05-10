import {useCookies} from "react-cookie";
import {
    GameContextCookie,
    GameState,
    getDefaultGameState,
    PlayerState,
    PlayerStatus
} from "~/pages/context.ts";
import {KeeperComponent} from "~/components/KeeperComponent.tsx";
import {useState} from "react";
import {OnFieldComponent} from "~/components/OnFieldComponent.tsx";
import {ReserveComponent} from "~/components/ReserveComponent.tsx";
import {UnavailableComponent} from "~/components/UnavailableComponent.tsx";
import useTick from "~/lib/useTick.tsx";
import {timeToString} from "~/components/PlayerCard.tsx";
import {useNavigate} from "react-router";


export default function InGameRoute() {
    const [gameContextCookie, setGameContextCookie, removeGameContextCookie] = useCookies<typeof GameContextCookie, GameState>([GameContextCookie])
    const [gameState, setGameState] = useState<GameState>(gameContextCookie[GameContextCookie] ?? getDefaultGameState())
    const [isPlaying, setIsPlaying] = useState(false)
    const [gameClock, setGameClock] = useState(0)
    const [clearDataCount, setClearDataCount] = useState(0)
    const navigate = useNavigate()

    const updateClocks = (deltaTime: number) => {
        if (!isPlaying) return
        setGameClock((prevClock) => prevClock + deltaTime)
        setGameState((prevState) => {
            return {
                ...prevState,
                players: prevState.players.map((player: PlayerState) => {
                    return {
                        ...player,
                        timePlayed: player.status === 'onField' ? player.timePlayed + deltaTime : player.timePlayed
                    }
                })
            }
        })
    }

    const saveGameState = (deltaTime: number) => {
        if (!isPlaying) return
        // setClearDataCount((prevState) => 0)
        setGameContextCookie(GameContextCookie, {
            ...gameState,
        })
    }
    useTick(1000, updateClocks)
    useTick(10000, saveGameState)

    const changeStatus = (name: string, status: PlayerStatus) => {
        setGameState((prevState) => {
            return {
                ...prevState,
                players: prevState.players.map((player) => {
                    if (player.name === name) {
                        return {
                            ...player,
                            status,
                        }
                    }
                    return player
                })
            }
        })
    }

    const exportData = () => {
        setIsPlaying(prevState => false)
        setGameContextCookie(GameContextCookie, {
            ...gameState,
        })
        navigate('/game_time/export_data')
    }
    const resetData = () => {
        setClearDataCount((prevState) => prevState + 1)
        if( clearDataCount > 2) {
            setGameState((prevState) => getDefaultGameState())
            removeGameContextCookie(GameContextCookie)
            setClearDataCount((prevState) => {return 0})
            setGameClock((prevState) => {return 0})
        }
    }

    return(
        <div className="p-4">
            <h1 className="font-bold pb-4">Game Management</h1>
            <h2 className="font-bold p-2">Game Timer</h2>
            <div className="p-4 bg-gray-800 rounded-2xl grid grid-cols-3 items-center justify-items-center">
                <div className="col-span-1"><button onClick={() => {setIsPlaying((prev) => true)}}>Start</button></div>
                <div className="col-span-1"><button onClick={() => setIsPlaying((prev) => false)}>Stop</button></div>
                <div className="col-span-1">{timeToString(gameClock)}</div>
            </div>
            <h2 className="font-bold p-2">Roster</h2>
            <div className="p-4 bg-gray-800 rounded-2xl">
            <KeeperComponent
                players={gameState.players}
                onDown={(name: string) => {
                    if (gameState.players.filter((player) => player.status === 'onField').length >= (gameState.playersOnField - 1)) {
                        changeStatus(name, 'isSub')
                    } else {
                        changeStatus(name, 'onField')
                    }
                }}/>
            <OnFieldComponent
                players={gameState.players}
                onDown={(name: string) => changeStatus(name, 'isSub')}
                onUp={(name: string) => {
                    if (gameState.players.filter((player) => player.status === 'isKeeper').length == 0) {
                        changeStatus(name, 'isKeeper')
                    }
                }}/>
            <ReserveComponent
                players={gameState.players}
                onDown={(name: string) => changeStatus(name, 'isUnavailable')}
                onUp={(name: string) => {
                    if (gameState.players.filter((player) => player.status === 'onField').length >= (gameState.playersOnField - 1)  &&
                        gameState.players.filter((player) => player.status === 'isKeeper').length == 0
                    ) {
                        changeStatus(name, 'isKeeper')
                    } else if (gameState.players.filter((player) => player.status === 'onField').length < (gameState.playersOnField - 1)){
                        changeStatus(name, 'onField')
                    }
                }}
            />
            <UnavailableComponent players={gameState.players} onUp={(name: string) => changeStatus(name, 'isSub')}/>
            </div>
            <h2 className="font-bold p-2">Data Management</h2>
            <div className="p-4 bg-gray-800 rounded-2xl grid grid-cols-2 items-center justify-items-center">
                <div className="col-span-1"><button onClick={exportData}>Export Data</button></div>
                <div className={clearDataCount > 2 ? ("col-span-1 text-red-400") : ("col-span-1")}><button onClick={resetData}>Clear All Data</button></div>
            </div>
        </div>
    )
}
