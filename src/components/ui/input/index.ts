import { InputControl, InputControlProps } from './control'
import { InputIcon, InputIconProps } from './icon'
import { InputRoot, InputRootProps } from './root'

export const Input = {
  Root: InputRoot,
  Control: InputControl,
  Icon: InputIcon,
}
export type InputProps = {
  Root: InputRootProps
  Control: InputControlProps
  Icon: InputIconProps
}
