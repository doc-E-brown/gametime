import { Team } from 'app/data'
import { getListOfTeams } from '../../data'

export default function ManageTeamRoute({ params }: { params: { teamId: string } }) {
  const teams = getListOfTeams()
  return (
    <div>
      <h1>Manage Team</h1>
      {teams
        .map((team: Team) => (
          <div key={team.id}>
            <h2>{team.name}</h2>
          </div>
        ))
        .reverse()}
    </div>
  )
}
