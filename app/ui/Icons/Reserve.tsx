import { RiSwapFill } from 'react-icons/ri'

export function Reserve({ subCount, size }: { subCount?: number; size?: string }) {
  const haveSubCount = subCount !== undefined
  return (
    <div className="relative inline-block items-center">
      <div>
        <RiSwapFill size={size ?? '24'} />
      </div>
      {haveSubCount && (
        <div className="absolute bottom-2 left-2 pl-2 text-black font-bold">{subCount}</div>
      )}
    </div>
  )
}
