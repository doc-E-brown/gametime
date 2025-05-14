import { useFormContext } from 'react-hook-form'
import { InMatchForm } from 'app/forms/Match'
import { FaPlusCircle } from 'react-icons/fa'
import { FaMinusCircle } from 'react-icons/fa'

export type GameScoreProps = {
  teamName: string
  opponentName: string
}

function ScoreElement({ score, inc, dec }: { score: number; inc: () => void; dec: () => void }) {
  return (
    <>
      <div className="col-span-1">
        <button type="button" onClick={inc}>
          <FaPlusCircle />
        </button>
      </div>
      <div className="col-span-1">{score}</div>
      <div className="col-span-1">
        <button type="button" onClick={dec}>
          <FaMinusCircle />
        </button>
      </div>
    </>
  )
}

export function GameScore({ teamName, opponentName }: GameScoreProps) {
  const { watch, setValue } = useFormContext<InMatchForm>()

  const teamScore = watch('teamScore')
  const opponentScore = watch('opponentScore')

  const incTeamScore = () => {
    setValue('teamScore', (teamScore ?? 0) + 1)
  }
  const decTeamScore = () => {
    if (teamScore === 0) return
    setValue('teamScore', (teamScore ?? 0) - 1)
  }

  const incOpponentScore = () => {
    setValue('opponentScore', (opponentScore ?? 0) + 1)
  }
  const decOpponentScore = () => {
    if (opponentScore === 0) return
    setValue('opponentScore', (opponentScore ?? 0) - 1)
  }

  return (
    <>
      <h2 className="font-bold p-2">Score</h2>
      <div className="p-4 bg-gray-800 rounded-2xl grid grid-cols-7 items-center justify-items-center">
        <div className="col-span-3 pb-2 font-bold">{teamName}</div>
        <div className="col-span-1"></div>
        <div className="col-span-3 pb-2 font-bold">{opponentName}</div>
        <div className="col-span-1">
          <button type="button" onClick={incTeamScore}>
            <FaPlusCircle />
          </button>
        </div>
        <div className="col-span-1">{teamScore ?? 0}</div>
        <div className="col-span-1">
          <button type="button" onClick={decTeamScore}>
            <FaMinusCircle />
          </button>
        </div>
        <div className="col-span-1" />
        <div className="col-span-1">
          <button type="button" onClick={decOpponentScore}>
            <FaMinusCircle />
          </button>
        </div>
        <div className="col-span-1">{opponentScore ?? 0}</div>
        <div className="col-span-1">
          <button type="button" onClick={incOpponentScore}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </>
  )
}
