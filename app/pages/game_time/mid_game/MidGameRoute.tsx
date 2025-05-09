import {Fragment, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {GameContextCookie, GameState, PlayerStatus} from "~/pages/game_time/context";
import {PlayerState} from "../context";

function timeToString(time: number): string {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function PlayRow({player, onClick}: { player: PlayerState, onClick: () => void }) {
    return (
        <Fragment key={player.name}>
            <div className="col-span-1">
                <button onClick={onClick}>{player.name}</button>
            </div>
            <div className="col-span-1">
                <p>{timeToString(player.timePlayed)}</p>
            </div>
        </Fragment>
    )
}

export default function MidGameRoute() {
    const [gameContextCookie, setGameContextCookie] = useCookies<typeof GameContextCookie, GameState>([GameContextCookie])
    const initialGameState = gameContextCookie[GameContextCookie]
    const [gameState, setGameState] = useState<GameState>(initialGameState)
    const [isGamePlaying, setIsGamePlaying] = useState(gameContextCookie.isGamePlaying)
    const [prevTime, setPrevTime] = useState(new Date().getTime())
    const [numOnField, setNumOnField] = useState(gameState.players.filter((player: PlayerState) => player.status == 'onField').length)
    const [gameClock, setGameClock] = useState(0)

    useEffect(() => {
        if(!isGamePlaying) return;
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const deltaTime = (now - prevTime) / 1000 // convert to seconds
            setPrevTime(now)
            const newGameState = {
                ...gameState,
                players: gameState.players.map((player: PlayerState) => {
                    return {
                        ...player,
                        timePlayed: player.status === 'onField' ? player.timePlayed + deltaTime : player.timePlayed
                    }
                })
            }
            setGameState(newGameState)
            setGameClock(gameClock + deltaTime)
        }, 1000)
        const saveInterval = setInterval(() => {
            setGameContextCookie(GameContextCookie, gameState)
        }, 10000) // save every 10 seconds
        return () => clearInterval(interval)
    }, [setGameState, gameState, setGameContextCookie])

    const startGame = () => {
        if (gameState.isGamePlaying) return
        setGameState({
            ...gameState,
            isGamePlaying: true,
            gameStage: gameState.gameStage == 'pre-game' ? 'first-half' : 'second-half',
        })
        setGameContextCookie(GameContextCookie, gameState)
        setIsGamePlaying(true)
        setPrevTime(new Date().getTime())
        console.log(gameState)
    }

    const endHalf = () => {
        if (!gameState.isGamePlaying) return
        setGameState({
            ...gameState,
            isGamePlaying: false,
            gameStage: gameState.gameStage == 'first-half' ? 'half-time' : 'post-game',
        })
        setGameContextCookie(GameContextCookie, gameState)
        setIsGamePlaying(false)
        console.log(gameState)
    }

    const subOn = (playerName: string) => {
        if (numOnField >= gameState.playersOnField) return
        const newGameState = {
            ...gameState,
            players: gameState.players.map((player: PlayerState) => {
                if (player.name === playerName) {
                    return {
                        ...player,
                        status: 'onField' as PlayerStatus
                    }
                }
                return player
            })
        }
        setGameState(newGameState)
        setNumOnField(numOnField + 1)
        setGameContextCookie(GameContextCookie, newGameState)
    }

    const subOff = (playerName: string) => {
        const newGameState = {
            ...gameState,
            players: gameState.players.map((player: PlayerState) => {
                if (player.name === playerName) {
                    return {
                        ...player,
                        status: 'isSub' as PlayerStatus
                    }
                }
                return player
            })
        }
        setGameState(newGameState)
        setNumOnField(numOnField - 1)
        setGameContextCookie(GameContextCookie, newGameState)
    }

    return (
        <div>
            <h1>Play Counter</h1>
            <h2>Game Clock: {timeToString(gameClock)}</h2>
            <h2>Game State: {gameState.gameStage}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 font-bold">On Field</div>
                {
                    gameState.players.filter((player: PlayerState) => player.status === 'onField')
                        .sort((a: PlayerState, b: PlayerState) => b.timePlayed - a.timePlayed)
                        .map((player: PlayerState) => {
                        return (<PlayRow player={player} key={player.name} onClick={() => subOff(player.name)}/>)
                })}
            <div className="col-span-2 font-bold">Off Field</div>
                {
                    gameState.players.filter((player: PlayerState) => player.status === 'isSub')
                        .sort((a: PlayerState, b: PlayerState) => a.timePlayed - b.timePlayed)
                        .map((player: PlayerState) => {
                        return (<PlayRow player={player} key={player.name} onClick={() => subOn(player.name)}/>)
                    })}
            </div>
            <p><button onClick={startGame}>Start {gameState.gameStage === 'pre-game' ? 'Game' : 'Half'}</button></p>
            <p><button onClick={endHalf}>End {gameState.gameStage === 'first-half' ? 'Half' : 'Game'}</button></p>
        </div>
    );
}
