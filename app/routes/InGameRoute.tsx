import { GameState, Player, getDefaultGameState, PlayerStatus, PlayerState } from '../data'
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
  const GameContextCookie = 'gameContextCookie'
  const [gameState, setGameState] = useState<GameState>(getDefaultGameState())
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameClock, setGameClock] = useState(0)
  const [clearDataCount, setClearDataCount] = useState(0)
  const navigate = useNavigate()

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Manage player status
  const changeStatus = (player, status) => {
    setGameState((prevState) => ChangePlayerStatus(prevState, player, status))
  }

  const onFieldAction = (player: Player) => {
    if (!isFieldFull(gameState)) {
      changeStatus(player, 'isOnField')
    }
  }

  const onKeeperAction = (player: Player) => {
    if (!isKeeperAssigned(gameState)) {
      changeStatus(player, 'isKeeper')
    }
  }

  const onReserveAction = (player: Player) => {
    changeStatus(player, 'isReserve')
  }
  ///////////////////////////////////////////////////////////////////////////////////////////

  const updateClocks = (deltaTime: number) => {
    if (!isPlaying) return
    setGameClock((prevClock) => prevClock + deltaTime)
    setGameState((prevState) => {
      return {
        ...prevState,
        playerStates: prevState.playerStates.map((state: PlayerState) => {
          return {
            ...state,
            timePlayed:
              state.status === 'isOnField' ? state.timePlayed + deltaTime : state.timePlayed,
          }
        }),
      }
    })
  }

  // const saveGameState = (deltaTime: number) => {
  //   if (!isPlaying) return
  //   // setClearDataCount((prevState) => 0)
  //   setGameContextCookie(GameContextCookie, {
  //     ...gameState,
  //   })
  // }
  useTick(1000, updateClocks)
  // useTick(10000, saveGameState)

  // const exportData = () => {
  //   setIsPlaying(() => false)
  //   setGameContextCookie(GameContextCookie, {
  //     ...gameState,
  //   })
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   navigate('/export_data')
  // }
  const resetData = () => {
    setClearDataCount((prevState) => prevState + 1)
    if (clearDataCount > 2) {
      setGameState((prevState) => getDefaultGameState())
      // removeGameContextCookie(GameContextCookie)
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
          playerStates={gameState.playerStates}
          onReserveAction={onReserveAction}
          onFieldAction={onFieldAction}
        />
        <OnField
          playerStates={gameState.playerStates}
          onReserveAction={onReserveAction}
          onKeeperAction={onKeeperAction}
        />
        <Reserve
          playerStates={gameState.playerStates}
          onKeeperAction={onKeeperAction}
          onFieldAction={onFieldAction}
        />
        <Unavailable
          playerStates={gameState.playerStates}
          onReserveAction={onReserveAction}
          onFieldAction={onFieldAction}
          onKeeperAction={onKeeperAction}
        />
      </div>
      <h2 className="font-bold p-2">Data Management</h2>
      <div className="p-4 bg-gray-800 rounded-2xl grid grid-cols-2 items-center justify-items-center">
        <div className="col-span-1">
          <button onClick={() => {}}>Export Data</button>
        </div>
        <div className={clearDataCount > 2 ? 'col-span-1 text-red-400' : 'col-span-1'}>
          <button onClick={resetData}>Clear All Data</button>
        </div>
      </div>
    </div>
  )
}
