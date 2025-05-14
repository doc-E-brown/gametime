import { useNavigate } from 'react-router'

export default function WelcomeRoute() {
  const navigate = useNavigate()

  function handleCreateNewTeam() {
    navigate('/team/new')
  }

  function handleNewMatch() {
    navigate('/match/new')
  }

  return (
    <div>
      <h1>Welcome to GameTime</h1>
      <p>
        <button onClick={handleCreateNewTeam}>Create New Team</button>
      </p>
      <p>
        <button onClick={handleNewMatch}>New Match</button>
      </p>
    </div>
  )
}
