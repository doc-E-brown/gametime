import { PlayerState } from '../../pages/context.ts'
import { GoalKeeper, OnField as OnFieldIcon, Reserve } from '../icons'
import { PlayerCard } from './PlayerCard.tsx'

export type KeeperComponentProps = {
  players: PlayerState[]
  onFieldAction: (name: string) => void
  onReserveAction: (name: string) => void
}

export function Keeper({ players, onReserveAction, onFieldAction }: KeeperComponentProps) {
  return (
    <div className="w-full border-white rounded-md">
      <h2 className="relative inline-block items-left font-bold">
        <GoalKeeper size={'16'} />
        <span className="pl-2">Keeper</span>
      </h2>
      {players
        .filter((player) => player.status === 'isKeeper')
        .map((player) => {
          return (
            <PlayerCard
              player={player}
              key={player.name}
              optionAComponent={<OnFieldIcon />}
              optionAEnabled={true}
              onOptionAClick={() => onFieldAction(player.name)}
              optionBComponent={<Reserve subCount={player.timesAsSub} />}
              optionBEnabled={true}
              onOptionBClick={() => onReserveAction(player.name)}
              optionCComponent={<GoalKeeper />}
              optionCEnabled={false}
            />
          )
        })}
    </div>
  )
}
