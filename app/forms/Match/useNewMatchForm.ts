import { useForm } from 'react-hook-form'

export type NewMatch = {
  teamId: string
  opponentName: string
}

export function useNewMatchForm() {
  return useForm<NewMatch>()
}
