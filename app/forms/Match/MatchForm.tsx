import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useInMatchForm } from './useInMatchForm'
import { loadMatchSummary, saveMatchDetails } from 'app/data'
import { GameClock, PlayerManagement } from 'app/ui/Match'

export function MatchForm({ matchId }: { matchId: string }) {
  const formProps = useInMatchForm({ matchId })

  const matchSummary = loadMatchSummary(matchId)
  const dt = new Date(matchSummary.date).toDateString()
  const match = formProps.getValues()

  const deltaTime = formProps.watch('deltaTime')
  const initialClock = formProps.watch('gameClock')

  const save = () => {
    const matchUpdate = formProps.getValues()
    if (matchUpdate) {
      saveMatchDetails(matchUpdate)
    }
  }

  useEffect(() => {
    save()
  }, [deltaTime])

  return (
    <FormProvider {...formProps}>
      <h1>
        {match.team.name} vs {matchSummary.opponentName} {dt}
      </h1>
      <GameClock initialClock={initialClock} />
      <PlayerManagement />
    </FormProvider>
  )
}
