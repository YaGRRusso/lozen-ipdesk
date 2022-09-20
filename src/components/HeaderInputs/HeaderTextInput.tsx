export interface HeaderTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const HeaderTextInput = ({ ...rest }: HeaderTextInputProps) => {
  return <input type="text" className="flex-1 min-w-sm p-1 rounded" {...rest} />
}

export default HeaderTextInput
