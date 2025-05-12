import { Player, PlayerState } from '../../data'
import { PlayerStateCard } from './PlayerStateCard.tsx'
import { GoalKeeper, OnField as OnFieldIcon, Reserve } from '../icons'

export type UnavailableComponentProps = {
  playerStates: PlayerState[]
  onFieldAction: (name: Player) => void
  onReserveAction: (name: Player) => void
  onKeeperAction: (name: Player) => void
}

export function Unavailable({
  playerStates,
  onFieldAction,
  onReserveAction,
  onKeeperAction,
}: UnavailableComponentProps) {
  const allAvailable = () => {
    playerStates.forEach((state) => {
      onFieldAction(state.player)
    })
  }
  return (
    <div className="w-full border-white rounded-md">
      <h2 className="font-bold pt-2">Unavailable</h2>
      <p className="p-4">
        <button onClick={allAvailable}>All Available</button>
      </p>
      {playerStates
        .filter((state) => state.status === 'isUnavailable')
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
              onOptionCClick={() => onKeeperAction(state.player)}
              optionCEnabled={true}
            />
          )
        })}
    </div>
  )
}
