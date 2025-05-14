import { IoFootballOutline } from 'react-icons/io5'

export function OnField({ size }: { size?: string }) {
  return (
    <div className="relative inline-block items-center">
      <IoFootballOutline size={size ?? '24'} />
    </div>
  )
}
