import { ArrowClockwise, ArrowSquareIn, Image, Trash } from 'phosphor-react'
import { useMemo } from 'react'
import ReactPaginate from 'react-paginate'

export interface InfoTableProps extends React.HTMLAttributes<HTMLTableElement> {
  titles: string[]
  count: number
  currentPage?: {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
  }
  refresh: () => void
  totalPages?: number
  data: {
    id: number
    name: string
    link: string
    parentId?: number
    warning?: boolean
  }[]
  deleteFunction: (id: number) => void
}

const InfoTable = ({
  titles,
  data,
  count,
  currentPage,
  totalPages,
  deleteFunction,
  refresh,
  ...rest
}: InfoTableProps) => {
  const showPagination = useMemo(() => {
    if (totalPages && totalPages > 1 && currentPage) {
      return true
    } else {
      return false
    }
  }, [totalPages, currentPage])

  return (
    <>
      <table
        className="w-full border-separate border-spacing-0 shadow rounded overflow-hidden"
        {...rest}
      >
        <thead className="bg-sky-800 text-white text-left">
          <tr>
            {titles.map((item, index) => (
              <th
                key={index}
                className={`py-4 px-2 ${
                  index > 0 ? 'hidden sm:table-cell' : ''
                }`}
              >
                {item}
              </th>
            ))}
            <th className="w-16 px-2">
              <span
                className="flex cursor-pointer transition-all hover:bg-sky-700 py-1 text-sm items-center gap-1 justify-center border rounded"
                onClick={() => {
                  refresh()
                  currentPage?.setValue(1)
                }}
              >
                {count}
                <ArrowClockwise weight="bold" size={12} />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              className={`${
                item.warning ? 'bg-slate-50' : ''
              } hover:bg-slate-100 transition-all text-slate-900`}
              key={item.id}
            >
              <td className="p-2">
                <div className="flex flex-col">
                  <span className="sm:hidden text-xs opacity-70">
                    {item.parentId}
                  </span>
                  <span className="sm:hidden">{item.name}</span>
                  {item.id}
                </div>
              </td>
              <td className="p-2 hidden sm:table-cell">
                <span className="flex gap-1 items-center">
                  {item.name}
                  {item.warning && <Image size={14} />}
                </span>
              </td>
              {item.parentId && (
                <td className="p-2 hidden sm:table-cell">{item.parentId}</td>
              )}
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <button
                    className="hover:bg-red-300 p-1 rounded transition-all z-10"
                    onClick={() => {
                      deleteFunction(item.id as number)
                    }}
                  >
                    <Trash size={22} />
                  </button>
                  <a
                    className="hover:bg-sky-300 p-1 rounded transition-all z-10"
                    href={item.link}
                    target="_blank"
                  >
                    <ArrowSquareIn size={22} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentPage && showPagination && (
        <ReactPaginate
          className="flex gap-1 items-center justify-evenly max-w-lg mx-auto"
          activeClassName="pointer-events-none px-1 rounded bg-sky-800 text-white"
          pageClassName="px-1 rounded transition-all hover:bg-gray-200"
          nextClassName="hidden"
          previousClassName="hidden"
          pageCount={totalPages ?? 0}
          forcePage={currentPage.value - 1}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={(ev) => currentPage.setValue(ev.selected + 1)}
        />
      )}
    </>
  )
}

export default InfoTable
