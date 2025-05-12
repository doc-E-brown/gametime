import { createContext } from "react";

export type PlayerStatus = "isOnField" | "isReserve" | "isKeeper" | "isUnavailable";

export type PlayerState = {
  name: string;
  timePlayed: number;
  status: PlayerStatus;
  timesAsSub: number;
  subOffTime: number;
};

export type GameState = {
  players: PlayerState[];
  playersOnField: number;
  isGamePlaying: boolean;
  gameStage:
    | "pre-game"
    | "first-half"
    | "half-time"
    | "second-half"
    | "post-game";
};

export type PlayerEvent = {
  type: "start" | "subOn" | "subOff";
  playerName: string;
};

export type GameEvent = {
  type: "start" | "stop";
};

export type Event = PlayerEvent | GameEvent;

export const GameContext = createContext(null);
export const EventContext = createContext(null);

export const GameContextCookie = "gameContextCookie";
export const EventContextCookie = "eventContextCookie";

function createPlayer(name: string): PlayerState {
  return {
    name,
    timePlayed: 0,
    status: "isUnavailable",
    timesAsSub: 0,
    subOffTime: 0,
  };
}

export function getDefaultGameState(): GameState {
  return {
    players: [
      createPlayer("Ben"),
      createPlayer("Emmett"),
      createPlayer("Freddy"),
      // createPlayer('Harry'),
      // createPlayer('Hunter'),
      // createPlayer('Isaac'),
      // createPlayer('Lachy'),
      // createPlayer('Lawson'),
      // createPlayer('Lewis'),
      // createPlayer('Matthew'),
      // createPlayer('Robin'),
      // createPlayer('Sam'),
      // createPlayer('Tim'),
    ],
    playersOnField: 9,
    isGamePlaying: false,
    gameStage: "pre-game",
  };
}
