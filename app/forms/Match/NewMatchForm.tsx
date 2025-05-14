import { FormProvider, SubmitHandler } from 'react-hook-form'
import { NewMatch, useNewMatchForm } from './useNewMatchForm'
import { SelectTeam } from './SelectTeam'
import { TextInput } from 'app/ui/Input/TextInput'
import { addNewMatch } from 'app/data'

export type StartMatchFormProps = {
  onSubmit: (teamId: string) => void
  onSubmitText: string
}

export function NewMatchForm({ onSubmit, onSubmitText }: StartMatchFormProps) {
  const formProps = useNewMatchForm()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formProps

  const doSubmit: SubmitHandler<NewMatch> = (data) => {
    if (!errors.teamId) {
      const { teamId, opponentName } = data
      const newMatchId = addNewMatch(teamId, opponentName)
      onSubmit(newMatchId)
    }
  }

  return (
    <FormProvider {...formProps}>
      <div>
        <form onSubmit={handleSubmit(doSubmit)}>
          <SelectTeam />
          <div>
            <label htmlFor="opponentName">Opponent Name</label>
            <TextInput {...register('opponentName', { required: false })} />
          </div>
          <p>
            <button type="submit">{onSubmitText}</button>
          </p>
        </form>
      </div>
    </FormProvider>
  )
}
