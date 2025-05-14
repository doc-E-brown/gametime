import { TbPlayFootball } from 'react-icons/tb'

export function OnField({ size }: { size?: string }) {
  return (
    <div className="relative inline-block items-center">
      <TbPlayFootball size={size ?? '24'} />
    </div>
  )
}
