import { Link, useLocation } from 'react-router-dom'

export interface HeaderListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  data: {
    name: string
    local: string
  }[]
}

const HeaderList = ({ data, ...rest }: HeaderListProps) => {
  const { pathname } = useLocation()

  return (
    <ul
      className="flex flex-wrap py-2 px-4 gap-4 justify-center uppercase font-semibold text-sm text-slate-50"
      {...rest}
    >
      {data.map((item) => (
        <li key={item.name}>
          <Link
            to={item.local}
            className={`${pathname === item.local ? 'bg-sky-700' : ''}
                  px-2 py-1 rounded-sm hover:bg-sky-700 transition-all cursor-pointer`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default HeaderList
