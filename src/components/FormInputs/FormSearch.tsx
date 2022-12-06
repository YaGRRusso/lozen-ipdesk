import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'

export interface FormSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleSearch: (query: string) => void
}

const FormSearch = ({ handleSearch, ...rest }: FormSearchProps) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      handleSearch(searchValue)
    }, 1200)
    return () => clearTimeout(searchDebounce)
  }, [searchValue])

  return (
    <div className="flex dark:text-slate-200 flex-row gap-2 justify-end items-center text-slate-900">
      <span className="text-xs font-medium uppercase hidden xs:block">
        Pesquisar
      </span>
      <span className="relative items-center flex w-full max-w-xs">
        <input
          className="bg-transparent border border-sky-900 rounded px-2 py-1
          block text-ellipsis w-full"
          type="text"
          value={searchValue}
          onChange={(ev) => setSearchValue(ev.target.value)}
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
