import { GiGoalKeeper } from 'react-icons/gi'

export function GoalKeeper({ size }: { size?: string }) {
  return (
    <div className="relative inline-block items-center">
      <GiGoalKeeper size={size ?? '24'} />
    </div>
  )
}
