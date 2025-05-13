import { Player, TeamConfiguration } from '../../data'
import { useForm } from 'react-hook-form'

export type NewTeam = {
  name: string
  players: string[]
  shirtNumbers: number[]
  configuration: TeamConfiguration
}

export function useCreateTeamForm() {
  return useForm<NewTeam>()
}
