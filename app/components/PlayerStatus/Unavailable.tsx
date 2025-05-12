import { PlayerState } from '../../routes/context.ts'
import { PlayerCard } from './PlayerCard.tsx'
import { GoalKeeper, OnField as OnFieldIcon, Reserve } from '../icons'

export type UnavailableComponentProps = {
  players: PlayerState[]
  onFieldAction: (name: string) => void
  onReserveAction: (name: string) => void
  onKeeperAction: (name: string) => void
}

export function Unavailable({
  players,
  onFieldAction,
  onReserveAction,
  onKeeperAction,
}: UnavailableComponentProps) {
  const allAvailable = () => {
    players.forEach((player) => {
      onFieldAction(player.name)
    })
  }
  return (
    <div className="w-full border-white rounded-md">
      <h2 className="font-bold pt-2">Unavailable</h2>
      <p className="p-4">
        <button onClick={allAvailable}>All Available</button>
      </p>
      {players
        .filter((player) => player.status === 'isUnavailable')
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
              onOptionCClick={() => onKeeperAction(player.name)}
              optionCEnabled={true}
            />
          )
        })}
    </div>
  )
}
