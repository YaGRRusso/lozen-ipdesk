import { MagnifyingGlass } from 'phosphor-react'

export interface FormSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormSearch = ({ ...rest }: FormSearchProps) => {
  const handleSearch = (text: string) => {
    console.log(text)
  }

  return (
    <div className="flex flex-row gap-2 justify-end items-center text-slate-900">
      <span className="text-xs font-medium uppercase hidden xs:block">
        Pesquisar
      </span>
      <span className="relative items-center flex w-full max-w-xs">
        <input
          className="bg-transparent border border-sky-900 rounded px-2 py-1
          block text-ellipsis w-full"
          type="text"
          onChange={(ev) => handleSearch(ev.target.value)}
          {...rest}
        />
        <button className="absolute right-2">
          <MagnifyingGlass />
        </button>
      </span>
    </div>
  )
}

export default FormSearch
