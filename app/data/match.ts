import { v4 as uuidv4 } from 'uuid'
import { Team } from './team'
import { PlayerState } from './player'

export type MatchSummary = {
  id: string
  teamId: string
  opponentName: string
  date: Date
}

export function createMatchSummary(teamId: string, opponentName: string): MatchSummary {
  return {
    id: uuidv4(),
    teamId,
    opponentName,
    date: new Date(),
  }
}

export type MatchStatus = 'notStated' | 'inProgress' | 'isPaused' | 'finished'

export type Match = {
  id: string
  team: Team
  playerStates: PlayerState[]
  playersOnField: number
  isGamePlaying: MatchStatus
  gameClock: number
  teamScore: number
  opponentScore: number
}

export function createMatch(matchSummary: MatchSummary, team: Team): Match {
  return {
    id: matchSummary.id,
    team,
    playerStates: team.players.map((player) => ({
      player,
      timePlayed: 0,
      status: 'isUnavailable',
      timesAsSub: 0,
      subOffTime: 0,
    })),
    playersOnField: 0,
    isGamePlaying: 'notStated',
    gameClock: 0,
    teamScore: 0,
    opponentScore: 0,
  }
}
