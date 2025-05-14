import { Player, PlayerState } from '../../data'
import { PlayerStateCard } from './PlayerStateCard'
import { GoalKeeper, OnField as OnFieldIcon, Reserve as ReserveIcon } from '../Icons'

export type SortMode = 'timePlayed' | 'lastSub' | 'numberOfSubs'

export type ReserveComponentProps = {
  playerStates: PlayerState[]
  onKeeperAction: (name: Player) => void
  onFieldAction: (name: Player) => void
  sortMode?: SortMode
}

export function Reserve({
  playerStates,
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
      {playerStates
        .filter((state) => state.status === 'isReserve')
        .sort(sortFn)
        .map((state) => {
          return (
            <PlayerStateCard
              playerState={state}
              key={state.player.name}
              optionAComponent={<OnFieldIcon />}
              optionAEnabled={true}
              onOptionAClick={() => onFieldAction(state.player)}
              optionBComponent={<ReserveIcon subCount={state.timesAsSub} />}
              optionBEnabled={false}
              optionCComponent={<GoalKeeper />}
              onOptionCClick={() => onKeeperAction(state.player)}
              optionCEnabled={true}
            />
          )
        })}
    </div>
  )
}
