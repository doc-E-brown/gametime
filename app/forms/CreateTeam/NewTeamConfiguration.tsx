import { AllTeamConfigurations, OpenConfiguration, TeamConfiguration } from '../../data'
import { useState } from 'react'
import { NewTeam, useCreateTeamForm } from './useCreateTeamForm'
import { useFormContext } from 'react-hook-form'

export default function NewTeamConfiguration() {
  const { setValue } = useFormContext<NewTeam>()
  const [config, setConfig] = useState<TeamConfiguration>(OpenConfiguration)

  const selectTeam = (id: string) => {
    const selectedTeam = AllTeamConfigurations.filter((team) => id == team.id)
    if (selectedTeam[0]) {
      setConfig(selectedTeam[0])
      setValue('configuration', selectedTeam[0])
    }
  }

  return (
    <>
      <h1>Team Configuration</h1>
      <div>
        <h2>Select Configuration</h2>
        <select onChange={(e) => selectTeam(e.target.value)}>
          {AllTeamConfigurations.map((team) => (
            <option key={team.id} value={team.id} selected={config.id === team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Custom Configuration</h2>
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
    </>
  )
}
