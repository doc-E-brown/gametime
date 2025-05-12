import { useCookies } from 'react-cookie'
import {
  GameContextCookie,
  GameState,
  getDefaultGameState,
  PlayerState,
  PlayerStatus,
} from './context.ts'
import {
  isFieldFull,
  isKeeperAssigned,
  Keeper,
  OnField,
  Reserve,
  Unavailable,
} from '../components/PlayerStatus'
import { useState } from 'react'
import useTick from '../lib/useTick.tsx'
import { useNavigate } from 'react-router'
import ChangePlayerStatus from 'app/lib/ChangePlayerStatus.ts'
import { timeToString } from '../lib/utils.ts'

export default function InGameRoute() {
  const [gameContextCookie, setGameContextCookie, removeGameContextCookie] = useCookies<
    typeof GameContextCookie,
    GameState
  >([GameContextCookie])
  const [gameState, setGameState] = useState<GameState>(
    gameContextCookie[GameContextCookie] ?? getDefaultGameState(),
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameClock, setGameClock] = useState(0)
  const [clearDataCount, setClearDataCount] = useState(0)
  const navigate = useNavigate()

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Manage player status
  const changeStatus = (name: string, status: PlayerStatus) => {
    setGameState((prevState) => ChangePlayerStatus(prevState, name, status))
  }

  const onFieldAction = (name: string) => {
    if (!isFieldFull(gameState)) {
      changeStatus(name, 'isOnField')
    }
  }

  const onKeeperAction = (name: string) => {
    if (!isKeeperAssigned(gameState)) {
      changeStatus(name, 'isKeeper')
    }
  }

  const onReserveAction = (name: string) => {
    changeStatus(name, 'isReserve')
  }
  ///////////////////////////////////////////////////////////////////////////////////////////

  const updateClocks = (deltaTime: number) => {
    if (!isPlaying) return
    setGameClock((prevClock) => prevClock + deltaTime)
    setGameState((prevState) => {
      return {
        ...prevState,
        players: prevState.players.map((player: PlayerState) => {
          return {
            ...player,
            timePlayed:
              player.status === 'isOnField' ? player.timePlayed + deltaTime : player.timePlayed,
          }
        }),
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

  const exportData = () => {
    setIsPlaying((prevState) => false)
    setGameContextCookie(GameContextCookie, {
      ...gameState,
    })
    navigate('/game_time/export_data')
  }
  const resetData = () => {
    setClearDataCount((prevState) => prevState + 1)
    if (clearDataCount > 2) {
      setGameState((prevState) => getDefaultGameState())
      removeGameContextCookie(GameContextCookie)
      setClearDataCount((prevState) => {
        return 0
      })
      setGameClock((prevState) => {
        return 0
      })
    }
  }

  return (
    <div className="p-4">
      <h1 className="font-bold pb-4">Game Management</h1>
      <h2 className="font-bold p-2">Game Timer</h2>
      <div className="p-4 bg-gray-800 rounded-2xl grid grid-cols-3 items-center justify-items-center">
        <div className="col-span-1">
          <button
            onClick={() => {
              setIsPlaying((prev) => true)
            }}
          >
            Start
          </button>
        </div>
        <div className="col-span-1">
          <button onClick={() => setIsPlaying((prev) => false)}>Stop</button>
        </div>
        <div className="col-span-1">{timeToString(gameClock)}</div>
      </div>
      <h2 className="font-bold p-2">Roster</h2>
      <div className="p-4 bg-gray-800 rounded-2xl">
        <Keeper
          players={gameState.players}
          onReserveAction={onReserveAction}
          onFieldAction={onFieldAction}
        />
        <OnField
          players={gameState.players}
          onReserveAction={onReserveAction}
          onKeeperAction={onKeeperAction}
        />
        <Reserve
          players={gameState.players}
          onKeeperAction={onKeeperAction}
          onFieldAction={onFieldAction}
        />
        <Unavailable
          players={gameState.players}
          onReserveAction={onReserveAction}
          onFieldAction={onFieldAction}
          onKeeperAction={onKeeperAction}
        />
      </div>
      <h2 className="font-bold p-2">Data Management</h2>
      <div className="p-4 bg-gray-800 rounded-2xl grid grid-cols-2 items-center justify-items-center">
        <div className="col-span-1">
          <button onClick={exportData}>Export Data</button>
        </div>
        <div className={clearDataCount > 2 ? 'col-span-1 text-red-400' : 'col-span-1'}>
          <button onClick={resetData}>Clear All Data</button>
        </div>
      </div>
    </div>
  )
}
