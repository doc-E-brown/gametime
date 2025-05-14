import { useCreateTeamForm } from './useCreateTeamForm'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { NewTeamName } from './NewTeamName'
import { NewTeamRoster } from './NewTeamRoster'
import { addNewTeam, createTeam, OpenConfiguration } from '../../data'
import { NewTeam } from './useCreateTeamForm'
import NewTeamConfiguration from './NewTeamConfiguration'
import { useEffect, useState } from 'react'

export function CreateTeamForm() {
  const formProps = useCreateTeamForm()
  const [teamSize, setTeamSize] = useState<number>(1)

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = formProps

  const config = watch('configuration')

  useEffect(() => {
    if (config) {
      const numPlayers = config?.playersOnField ?? 0
      const numReserves = config?.maximumReserves ?? 0
      setTeamSize((prev) => numPlayers + numReserves)
    }
  }, [config])

  const onSubmit: SubmitHandler<NewTeam> = (data) => {
    if (!errors.name && !errors.players && !errors.configuration) {
      const newTeam = createTeam(
        data.name,
        data.players.filter((val) => val !== ''),
        data.configuration,
      )
      addNewTeam(newTeam)
    }
  }

  return (
    <FormProvider {...formProps}>
      <h1>Create New Team</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NewTeamConfiguration />
        <NewTeamName />
        <NewTeamRoster teamSize={teamSize} />
        <p>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Team
          </button>
        </p>
      </form>
    </FormProvider>
  )
}
