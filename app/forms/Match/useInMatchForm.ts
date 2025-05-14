import { useForm } from 'react-hook-form'
import { createMatch, loadInMatchDetails, loadMatchSummary, loadTeam, Match } from 'app/data'

export type InMatchForm = Match & {
  deltaTime: number
}

export function useInMatchForm({ matchId }: { matchId: string }) {
  // Load the match details from the data store
  const match = loadInMatchDetails(matchId)

  if (match) {
    // If the match exists, return the form with the default values
    return useForm<InMatchForm>({
      defaultValues: { ...match, deltaTime: 0 },
    })
  }

  // If the match does not exist, create it
  const matchSummary = loadMatchSummary(matchId)

  if (matchSummary) {
    const team = loadTeam(matchSummary.teamId)
    const newMatch = createMatch(matchSummary, team)

    return useForm<InMatchForm>({ defaultValues: { ...newMatch, deltaTime: 0 } })
  }

  return useForm<InMatchForm>()
}
