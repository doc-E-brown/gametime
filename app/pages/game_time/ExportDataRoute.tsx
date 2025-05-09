import {useCookies} from "react-cookie";
import {GameContextCookie, GameState, getDefaultGameState} from "~/pages/game_time/context.ts";
import {useState} from "react";

export default function ExportDataRoute() {
  const [gameContextCookie, setGameContextCookie, removeGameContextCookie] = useCookies<typeof GameContextCookie, GameState>([GameContextCookie])
  const [gameState, setGameState] = useState<GameState>(gameContextCookie[GameContextCookie] ?? getDefaultGameState())

  return (JSON.stringify(gameState));
}
