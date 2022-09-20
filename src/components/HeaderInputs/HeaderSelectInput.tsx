export interface HeaderSelectInputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string
    name: string
  }[]
}

const HeaderSelectInput = ({ options, ...rest }: HeaderSelectInputProps) => {
  return (
    <select className="flex-1 min-w-sm p-1 rounded" {...rest}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

export default HeaderSelectInput
