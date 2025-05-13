import { joinClsx } from '../../lib/utils'
import { ComponentPropsWithRef } from 'react'

export type TextInputProps = ComponentPropsWithRef<'input'>

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      type="text"
      className={joinClsx(`border-2 border-white border-style-solid`, className ?? '')}
    />
  )
}
