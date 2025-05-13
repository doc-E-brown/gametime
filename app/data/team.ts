import { createPlayer, Player } from './player'
import { v4 as uuidv4 } from 'uuid'

export type Team = {
  name: string
  id: string
  players: Player[]
  configuration: TeamConfiguration
}

export type TeamConfiguration = {
  playersOnField: number
  playWithKeeper: boolean
  maximumReserves: number
  timePerPeriod: number // time in minutes
  breakTime: number // time in minutes
  name: string
  id: string
}

export const OpenConfiguration = {
  playersOnField: 11,
  playWithKeeper: true,
  maximumReserves: 5,
  timePerPeriod: 45, // time in minutes
  breakTime: 10, // time in minutes
  name: 'Open',
  id: 'open',
}

export const MiniRoosU6Configuration = {
  playersOnField: 4,
  playWithKeeper: false,
  maximumReserves: 3,
  timePerPeriod: 20, // minutes
  breakTime: 5,
  name: 'MiniRoos U6',
  id: 'miniRoosU6',
}

export const MiniRoosU7Configuration = {
  ...MiniRoosU6Configuration,
  name: 'MiniRoos U7',
  id: 'miniRoosU7',
}

export const MiniRoosU8Configuration = {
  playersOnField: 7,
  playWithKeeper: true,
  maximumReserves: 4,
  timePerPeriod: 20, // minutes
  breakTime: 5,
  name: 'MiniRoos U8',
  id: 'miniRoosU8',
}

export const MiniRoosU9Configuration = {
  ...MiniRoosU8Configuration,
  name: 'MiniRoos U9',
  id: 'miniRoosU9',
}

export const MiniRoosU10Configuration = {
  playersOnField: 9,
  playWithKeeper: true,
  maximumReserves: 5,
  timePerPeriod: 25, // minutes
  breakTime: 5,
  name: 'MiniRoos U10',
  id: 'miniRoosU10',
}

export const MiniRoosU11Configuration = {
  ...MiniRoosU10Configuration,
  name: 'MiniRoos U11',
  id: 'miniRoosU11',
}

export const AllTeamConfigurations = [
  MiniRoosU6Configuration,
  MiniRoosU7Configuration,
  MiniRoosU8Configuration,
  MiniRoosU9Configuration,
  MiniRoosU10Configuration,
  MiniRoosU11Configuration,
  OpenConfiguration,
]

export function createTeam(
  name: string,
  playerNames: string[],
  configuration: TeamConfiguration,
): Team {
  const players = playerNames.map((playerName, index) => createPlayer(playerName))
  return {
    name,
    players,
    id: uuidv4(),
    configuration,
  }
}
