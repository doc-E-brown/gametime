import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { InMatchForm } from 'app/form/Match'
import { timeToString } from '../../lib/utils'
import { useTick } from 'app/ui/hooks'

export type GameClockProps = {
  initialClock: number
  tickPeriod?: number
}

export function GameClock({ initialClock, tickPeriod }: GameClockProps) {
  const { watch, setValue } = useFormContext<InMatchForm>()
  const [gameClock, setGameClock] = useState(initialClock ?? 0)

  const isGamePlaying = watch('isGamePlaying')

  const start = () => setValue('isGamePlaying', 'inProgress')
  const stop = () => setValue('isGamePlaying', 'isPaused')

  const onTick = (deltaTime: number) => {
    if (isGamePlaying != 'inProgress') return
    setGameClock((prevClock) => prevClock + deltaTime)
    setValue('deltaTime', deltaTime)
    setValue('gameClock', gameClock)
  }

  useTick(tickPeriod || 1000, onTick) // 1 second

  return (
    <>
      <h2 className="font-bold p-2">Game Clock</h2>
      <div className="p-4 bg-gray-800 rounded-2xl grid grid-cols-3 items-center justify-items-center">
        <div className="col-span-1">
          <button onClick={start}>Start</button>
        </div>
        <div className="col-span-1">
          <button onClick={stop}>Stop</button>
        </div>
        <div className="col-span-1">{timeToString(gameClock)}</div>
      </div>
    </>
  )
}
