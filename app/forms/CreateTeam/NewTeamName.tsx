import { isTeamNameAvailable } from 'app/data'
import { useFormContext } from 'react-hook-form'
import { NewTeam } from './useCreateTeamForm'
import { useEffect } from 'react'
import { TextInput } from 'app/ui/input/TextInput'

export function NewTeamName() {
  const {
    register,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext<NewTeam>()

  const teamName = watch('name')

  useEffect(() => {
    if (!isTeamNameAvailable(teamName)) {
      setError('name', { type: 'manual', message: 'Team name already exists' })
    } else {
      clearErrors('name')
    }
  }, [teamName])

  return (
    <>
      <h2>Enter Team Name</h2>
      <TextInput
        {...register('name', {
          required: true,
          validate: {
            isTeamNameAvailable: (value) =>
              isTeamNameAvailable(value) || 'Team name already exists',
          },
        })}
      />
      {errors.name && <span>{errors.name.message}</span>}
    </>
  )
}
