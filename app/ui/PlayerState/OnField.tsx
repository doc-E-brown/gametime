import { Player, PlayerState } from '../../data'
import { PlayerStateCard } from './PlayerStateCard'
import { GoalKeeper, Reserve, OnField as OnFieldIcon } from '../Icons'

export type OnFieldComponentProps = {
  playerStates: PlayerState[]
  onKeeperAction: (name: Player) => void
  onReserveAction: (name: Player) => void
  playWithKeeper: boolean
  maxOnField: number
}

export function OnField({
  playerStates,
  onKeeperAction,
  onReserveAction,
  playWithKeeper,
  maxOnField,
}: OnFieldComponentProps) {
  const onField = playerStates.filter((state) => state.status === 'isOnField')
  return (
    <div className="w-full border-white rounded-md">
      <h2 className="font-bold pt-2">
        <OnFieldIcon size={'16'} />
        <span className="pl-2">
          On Field ( {onField.length}/{maxOnField} )
        </span>
      </h2>
      {onField
        .sort((a, b) => b.timePlayed - a.timePlayed)
        .map((state) => {
          return (
            <PlayerStateCard
              playerState={state}
              key={state.player.name}
              optionAComponent={<OnFieldIcon />}
              optionAEnabled={true}
              optionBComponent={<Reserve subCount={state.timesAsSub} />}
              optionBEnabled={true}
              onOptionBClick={() => onReserveAction(state.player)}
              optionCComponent={<GoalKeeper />}
              optionCEnabled={playWithKeeper}
              onOptionCClick={() => onKeeperAction(state.player)}
            />
          )
        })}
    </div>
  )
}
