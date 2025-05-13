import { Player, PlayerState } from '../../data'
import { PlayerStateCard } from './PlayerStateCard'
import { GoalKeeper, Reserve, OnField as OnFieldIcon } from '../icons'

export type OnFieldComponentProps = {
  playerStates: PlayerState[]
  onKeeperAction: (name: Player) => void
  onReserveAction: (name: Player) => void
}

export function OnField({ playerStates, onKeeperAction, onReserveAction }: OnFieldComponentProps) {
  return (
    <div className="w-full border-white rounded-md">
      <h2 className="font-bold pt-2">
        <OnFieldIcon size={'16'} />
        <span className="pl-2">On Field</span>
      </h2>
      {playerStates
        .filter((state) => state.status === 'isOnField')
        .sort((a, b) => b.timePlayed - a.timePlayed)
        .map((state) => {
          return (
            <PlayerStateCard
              playerState={state}
              key={state.player.name}
              optionAComponent={<OnFieldIcon />}
              optionAEnabled={false}
              optionBComponent={<Reserve subCount={state.timesAsSub} />}
              optionBEnabled={true}
              onOptionBClick={() => onReserveAction(state.player)}
              optionCComponent={<GoalKeeper />}
              optionCEnabled={true}
              onOptionCClick={() => onKeeperAction(state.player)}
            />
          )
        })}
    </div>
  )
}
