import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { InMatchForm, useInMatchForm } from './useInMatchForm'
import { loadMatchSummary, saveMatchDetails } from 'app/data'
import { GameClock, GameScore, PlayerManagement } from 'app/ui/Match'

export function MatchForm({ matchId }: { matchId: string }) {
  const formProps = useInMatchForm({ matchId })
  const navigate = useNavigate()

  const { watch, setValue, handleSubmit } = formProps

  const matchSummary = loadMatchSummary(matchId)
  const dt = new Date(matchSummary.date).toDateString()
  const match = watch()

  const deltaTime = watch('deltaTime')
  const initialClock = watch('gameClock')
  const teamName = watch('team.name')

  const save = () => {
    const matchUpdate = formProps.getValues()
    if (matchUpdate) {
      saveMatchDetails(matchUpdate)
    }
  }

  useEffect(() => {
    save()
  }, [deltaTime])

  const finishGame: SubmitHandler<InMatchForm> = (data) => {
    setValue('isGamePlaying', 'finished')
    save()
    navigate('/')
  }

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(finishGame)}>
        <h1>
          {match.team.name} vs {matchSummary.opponentName} {dt}
        </h1>
        <GameClock initialClock={initialClock} />
        <GameScore teamName={teamName} opponentName={matchSummary.opponentName} />
        <PlayerManagement />
        <p>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Finish Game
          </button>
        </p>
      </form>
    </FormProvider>
  )
}
