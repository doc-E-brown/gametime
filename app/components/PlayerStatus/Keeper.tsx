import { PlayerState, Player } from '../../data'
import { GoalKeeper, OnField as OnFieldIcon, Reserve } from '../icons'
import { PlayerStateCard } from './PlayerStateCard.tsx'

export type KeeperComponentProps = {
  playerStates: PlayerState[]
  onFieldAction: (name: Player) => void
  onReserveAction: (name: Player) => void
}

export function Keeper({ playerStates, onReserveAction, onFieldAction }: KeeperComponentProps) {
  return (
    <div className="w-full border-white rounded-md">
      <h2 className="relative inline-block items-left font-bold">
        <GoalKeeper size={'16'} />
        <span className="pl-2">Keeper</span>
      </h2>
      {playerStates
        .filter((state) => state.status === 'isKeeper')
        .map((state) => {
          return (
            <PlayerStateCard
              playerState={state}
              key={state.player.name}
              optionAComponent={<OnFieldIcon />}
              optionAEnabled={true}
              onOptionAClick={() => onFieldAction(state.player)}
              optionBComponent={<Reserve subCount={state.timesAsSub} />}
              optionBEnabled={true}
              onOptionBClick={() => onReserveAction(state.player)}
              optionCComponent={<GoalKeeper />}
              optionCEnabled={false}
            />
          )
        })}
    </div>
  )
}
