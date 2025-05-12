import { PlayerState } from '../../routes/context.ts'
import { PlayerCard } from './PlayerCard.tsx'
import { GoalKeeper, Reserve, OnField as OnFieldIcon } from '../icons'

export type OnFieldComponentProps = {
  players: PlayerState[]
  onKeeperAction: (name: string) => void
  onReserveAction: (name: string) => void
}

export function OnField({ players, onKeeperAction, onReserveAction }: OnFieldComponentProps) {
  return (
    <div className="w-full border-white rounded-md">
      <h2 className="font-bold pt-2">
        <OnFieldIcon size={'16'} />
        <span className="pl-2">On Field</span>
      </h2>
      {players
        .filter((player) => player.status === 'isOnField')
        .sort((a, b) => b.timePlayed - a.timePlayed)
        .map((player) => {
          return (
            <PlayerCard
              player={player}
              key={player.name}
              optionAComponent={<OnFieldIcon />}
              optionAEnabled={false}
              optionBComponent={<Reserve subCount={player.timesAsSub} />}
              optionBEnabled={true}
              onOptionBClick={() => onReserveAction(player.name)}
              optionCComponent={<GoalKeeper />}
              optionCEnabled={true}
              onOptionCClick={() => onKeeperAction(player.name)}
            />
          )
        })}
    </div>
  )
}
