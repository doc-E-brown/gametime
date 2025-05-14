import { NewMatchForm } from 'app/forms/Match'
import { useNavigate } from 'react-router'
export default function CreateNewMatchRoute() {
  const navigate = useNavigate()

  const handleCreateNewMatch = (id: string) => {
    navigate(`/match/${id}`)
  }

  return (
    <div>
      <h1>New Match</h1>
      <NewMatchForm onSubmit={handleCreateNewMatch} onSubmitText="Create Match" />
    </div>
  )
}
