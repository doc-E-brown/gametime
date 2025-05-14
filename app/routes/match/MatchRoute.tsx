import { Info } from './+types/MatchRoute'
import {
  createMatch,
  loadMatchSummary,
  loadInMatchDetails,
  saveMatchDetails,
  loadTeam,
} from 'app/data'
import { MatchForm } from 'app/forms/Match'

export default function MatchRoute({ params: { matchId } }: Info) {
  const matchSummary = loadMatchSummary(matchId)

  if (!matchSummary) {
    return <div>Match not found</div>
  }

  const team = loadTeam(matchSummary.teamId)

  if (!team) {
    return <div>Team not found</div>
  }

  const match = loadInMatchDetails(matchId) ?? createMatch(matchSummary, team)

  return (
    <div>
      <h1>MatchRoute</h1>
      <MatchForm matchId={matchId} />
    </div>
  )
}
