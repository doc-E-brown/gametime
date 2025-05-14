import { useEffect } from 'react'
import { getListOfTeams } from '../../data'
import { useFormContext } from 'react-hook-form'
import { NewMatch } from './useNewMatchForm'

export function SelectTeam() {
  const formProps = useFormContext<NewMatch>()
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = formProps
  const listOfTeams = getListOfTeams()

  const isTeamIdValid = (teamId: string) => {
    return listOfTeams.some((team) => {
      return teamId === team.id
    })
  }

  const teamId = watch('teamId')

  useEffect(() => {
    if (!isTeamIdValid(teamId)) {
      setError('teamId', { type: 'manual', message: 'Please select a team' })
    } else {
      clearErrors('teamId')
    }
  }, [teamId])

  return (
    <>
      <select
        {...register('teamId', {
          required: true,
          validate: {
            isValidTeam: (value) => isTeamIdValid(value) || 'Please select a team',
          },
        })}
        defaultValue={''}
      >
        <option id={''} value={''} />
        {listOfTeams.map((team) => {
          return (
            <option key={team.id} id={team.id} value={team.id}>
              {team.name}
            </option>
          )
        })}
      </select>
      {errors.teamId && <span>{errors.teamId.message}</span>}
    </>
  )
}
