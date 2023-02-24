import { User } from 'phosphor-react'

export interface HeaderTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element
}

const HeaderTextInput = ({ icon, ...rest }: HeaderTextInputProps) => {
  return (
    <div className="flex relative items-center flex-1 min-w-sm rounded overflow-hidden">
      <div className="absolute text-lg left-1.5 text-gray-500">{icon}</div>
      <input
        type="text"
        className="w-full p-1.5 pl-7 h-full outline-none"
        {...rest}
      />
    </div>
  )
}

export default HeaderTextInput
