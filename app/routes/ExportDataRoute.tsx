import { useCookies } from 'react-cookie'
import { GameContextCookie, Match, getDefaultGameState } from '../data'
import { useState } from 'react'

export default function ExportDataRoute() {
  const [gameContextCookie, setGameContextCookie, removeGameContextCookie] = useCookies<
    typeof GameContextCookie,
    Match
  >([GameContextCookie])
  const [gameState, setGameState] = useState<Match>(
    gameContextCookie[GameContextCookie] ?? getDefaultGameState(),
  )

  return JSON.stringify(gameState)
}
