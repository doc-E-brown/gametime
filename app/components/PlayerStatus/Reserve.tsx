import { PlayerState } from '../../routes/context.ts'
import { PlayerCard } from './PlayerCard.tsx'
import { GoalKeeper, OnField as OnFieldIcon, Reserve as ReserveIcon } from '../icons'

export type SortMode = 'timePlayed' | 'lastSub' | 'numberOfSubs'

export type ReserveComponentProps = {
  players: PlayerState[]
  onKeeperAction: (name: string) => void
  onFieldAction: (name: string) => void
  sortMode?: SortMode
}

export function Reserve({
  players,
  onKeeperAction,
  onFieldAction,
  sortMode = 'lastSub',
}: ReserveComponentProps) {
  let sortFn = (a: PlayerState, b: PlayerState) => a.subOffTime - b.subOffTime
  switch (sortMode) {
    case 'timePlayed':
      sortFn = (a: PlayerState, b: PlayerState) => a.timePlayed - b.timePlayed
      break
    case 'numberOfSubs':
      sortFn = (a: PlayerState, b: PlayerState) => a.timesAsSub - b.timesAsSub
      break
    case 'lastSub':
    default:
      break
  }

  return (
    <div className="w-full border-white rounded-md">
      <h2 className="font-bold pt-2">
        <ReserveIcon size={'16'} />
        <span className="pl-2">Reserves</span>
      </h2>
      {players
        .filter((player) => player.status === 'isReserve')
        .sort(sortFn)
        .map((player) => {
          return (
            <PlayerCard
              player={player}
              key={player.name}
              optionAComponent={<OnFieldIcon />}
              optionAEnabled={true}
              onOptionAClick={() => onFieldAction(player.name)}
              optionBComponent={<ReserveIcon subCount={player.timesAsSub} />}
              optionBEnabled={false}
              optionCComponent={<GoalKeeper />}
              onOptionCClick={() => onKeeperAction(player.name)}
              optionCEnabled={true}
            />
          )
        })}
    </div>
  )
}
