import { useFormContext } from 'react-hook-form'
import { NewTeam } from './useCreateTeamForm'
import { useEffect, useState } from 'react'
import { TextInput } from '../../ui/Input/TextInput'

export function NewTeamRoster({ teamSize }: { teamSize: number }) {
  const {
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<NewTeam>()

  const [roster, setRoster] = useState<Array<string>>([''])

  useEffect(() => {
    setRoster((prev) => Array(teamSize).fill(''))
  }, [teamSize])

  useEffect(() => {
    setValue('players', roster)
  }, [roster])

  const updateMemberName = (index: number, value: string) => {
    if (roster.includes(value)) {
      setError(`players.${index}`, { type: 'manual', message: 'Player name already exists' })
    } else {
      clearErrors(`players.${index}`)
    }
    const updatedRoster = [...roster]
    updatedRoster[index] = value
    setRoster(updatedRoster)
  }

  const addTeamMember = () => {
    setRoster((prev) => [...prev, ''])
  }

  return (
    <>
      <h2>Enter Player Names</h2>
      {roster.map((member: string, index: number) => (
        <div key={index}>
          <TextInput
            value={member}
            onChange={(e) => {
              updateMemberName(index, e.target.value)
            }}
          />

          {errors.players && errors.players[index] && <span>{errors.players[index].message}</span>}
        </div>
      ))}
      <button type="button" onClick={addTeamMember}>
        +
      </button>
    </>
  )
}
