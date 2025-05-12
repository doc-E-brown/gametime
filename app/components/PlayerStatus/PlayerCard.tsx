import { ReactNode } from 'react'
import { PlayerState } from '../../routes/context.ts'
import { timeToString } from '../../lib/utils.ts'

export type PlayerCardProps = {
  player: PlayerState
  optionAComponent?: ReactNode
  onOptionAClick?: () => void
  optionAEnabled?: boolean
  optionBComponent?: ReactNode
  onOptionBClick?: () => void
  optionBEnabled?: boolean
  optionCComponent?: ReactNode
  onOptionCClick?: () => void
  optionCEnabled?: boolean
}

export function PlayerCard({
  player,
  optionAComponent,
  optionAEnabled,
  onOptionAClick,
  optionBComponent,
  optionBEnabled,
  onOptionBClick,
  optionCComponent,
  optionCEnabled,
  onOptionCClick,
}: PlayerCardProps) {
  return (
    <div className="flex flex-col items-left justify-center w-full p-2 border rounded-lg bg-gray-700">
      <div className="grid grid-cols-8">
        <div className="font-bold col-span-3 text-white text-l" data-testid="player-card-name">
          {player.name}
        </div>
        <div className="col-span-2 text-white gap-4 text-l items-center">
          {timeToString(player.timePlayed)}
        </div>
        <div className="col-span-1 text-white gap-4">
          {optionAComponent && (
            <button onClick={onOptionAClick} disabled={!optionAEnabled}>
              {optionAComponent}
            </button>
          )}
        </div>
        <div className="col-span-1 text-white gap-4">
          {optionBComponent && (
            <button onClick={onOptionBClick} disabled={!optionBEnabled}>
              {optionBComponent}
            </button>
          )}
        </div>
        <div className="col-span-1 text-white gap-4">
          {optionCComponent && (
            <button onClick={onOptionCClick} disabled={!optionCEnabled}>
              {optionCComponent}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
