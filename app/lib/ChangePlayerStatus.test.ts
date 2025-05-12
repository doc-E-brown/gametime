import { describe, expect, it, vi } from "vitest";
import ChangePlayerStatus from "../lib/ChangePlayerStatus.ts";
import { GameState } from "../pages/context";

describe("ChangePlayerStatus", () => {
  it("should update player status correctly", () => {
    const initialGameState: GameState = {
      players: [
        {
          name: "Player1",
          status: "isKeeper",
          timePlayed: 0,
          timesAsSub: 0,
          subOffTime: 0,
        },
        {
          name: "Player2",
          status: "isReserve",
          timePlayed: 0,
          timesAsSub: 0,
          subOffTime: 0,
        },
      ],
      playersOnField: 0,
      isGamePlaying: false,
      gameStage: "pre-game",
    };

    const newGameState = ChangePlayerStatus(
      initialGameState,
      "Player2",
      "isKeeper",
    );
    expect(newGameState.players[1].status).toBe("isKeeper");
  });
});
