import clsx from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export function timeToString(time: number): string {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

/**+
 * Configure tailwind-merge to know about our custom font sizes
 *
 * @see https://github.com/dcastil/tailwind-merge/issues/217#issuecomment-1500652940
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-2xs', 'text-sm', 'text-md', 'text-lg'],
    },
  },
})

export function joinClsx(...params: Parameters<typeof clsx>) {
  return customTwMerge(clsx(params))
}
