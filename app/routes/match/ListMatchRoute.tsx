import { getListOfMatches, getListOfTeams, MatchSummary, Team } from 'app/data'

export default function ListMatchRoute() {
  const allMatches: MatchSummary[] = getListOfMatches()
  const teams: Team[] = getListOfTeams()

  let teamNames: Record<string, string> = {}
  teams.forEach((team) => {
    teamNames[team.id] = team.name
  })

  return (
    <>
      <h1>List of Matches</h1>
      <ul>
        {allMatches.map((match) => (
          <li key={match.id}>
            <a href={`/match/${match.id}`}>
              {teamNames[match.teamId]} vs {match.opponentName}
            </a>
          </li>
        ))}
      </ul>
      <a href="/match/new">Create New Match</a>
    </>
  )
}
