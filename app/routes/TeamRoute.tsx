import { getListOfTeams } from '../data/storage'
import { useNavigate } from 'react-router'

export default function TeamRoute() {
  const teams = getListOfTeams()
  const navigate = useNavigate()

  const handleCreateNewTeam = () => {
    navigate('new')
  }

  return (
    <div>
      <h1>GameTime</h1>
      <h2>Welcome to GameTime!</h2>
      <div>
        <button onClick={handleCreateNewTeam}>Create New Team</button>
      </div>
    </div>
  )
}
