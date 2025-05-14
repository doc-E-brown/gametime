import { AllTeamConfigurations, OpenConfiguration, TeamConfiguration } from '../../data'
import { useState } from 'react'
import { NewTeam, useCreateTeamForm } from './useCreateTeamForm'
import { useFormContext } from 'react-hook-form'

export default function NewTeamConfiguration() {
  const { setValue, setError, clearErrors, register, watch } = useFormContext<NewTeam>()

  const config = watch('configuration')

  const isValidTeam = (teamId) => AllTeamConfigurations.some((team) => team.id === teamId)

  const selectTeam = (id: string) => {
    if (!isValidTeam(id)) {
      setError('configuration', { type: 'manual', message: 'Invalid team configuration' })
      return
    }
    const selectedTeam = AllTeamConfigurations.filter((team) => id == team.id)
    if (selectedTeam[0]) {
      console.log(selectedTeam[0])
      setValue('configuration', selectedTeam[0])
      clearErrors()
    }
  }

  return (
    <>
      <h1>Team Configuration</h1>
      <div>
        <h2>Select Configuration</h2>
        <select onChange={(e) => selectTeam(e.target.value)} defaultValue={''}>
          <option value="" selected={config === undefined} />
          {AllTeamConfigurations.map((team) => (
            <option key={team.id} value={team.id} selected={team.id === config?.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      {config && (
        <div>
          <h2>Configuration Descriptions</h2>
          <div className="grid grid-cols-2">
            <div className="col-span-1">Max. Players On Field</div>
            <div className="col-span-1">{config.playersOnField}</div>
            <div className="col-span-1">Max. Reserves</div>
            <div className="col-span-1">{config.maximumReserves}</div>
            <div className="col-span-1">Play with a Keeper</div>
            <div className="col-span-1">{config.playWithKeeper ? 'Yes' : 'No'}</div>
            <div className="col-span-1">Time per Half</div>
            <div className="col-span-1">{config.timePerPeriod} min</div>
            <div className="col-span-1">Half Time Duration</div>
            <div className="col-span-1">{config.breakTime} min</div>
          </div>
        </div>
      )}
    </>
  )
}
