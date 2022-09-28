import { ArrowClockwise, ArrowSquareIn, Image, Trash } from 'phosphor-react'
import { useMemo } from 'react'
import ReactPaginate from 'react-paginate'
import NoData from '/assets/no-data.svg'

export interface InfoTableProps extends React.HTMLAttributes<HTMLTableElement> {
  titles: string[]
  count: number
  currentPage?: {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
  }
  infoLoading: boolean
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
  infoLoading,
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
      <div className="shadow rounded">
        <table
          className="w-full border-separate border-spacing-0 rounded overflow-hidden"
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
              <th className="w-20 p-2">
                <span
                  title="Recarregar"
                  className="flex cursor-pointer w-full h-8 transition-all hover:bg-sky-700 p-1 text-sm items-center gap-1 justify-center border rounded"
                  onClick={() => {
                    refresh()
                    currentPage?.setValue(1)
                  }}
                >
                  <span className={infoLoading ? 'hidden' : ''}>{count}</span>
                  <span className={infoLoading ? 'animate-spin' : ''}>
                    <ArrowClockwise
                      weight="bold"
                      size={infoLoading ? 16 : 12}
                    />
                  </span>
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
                    <span className="text-sm sm:text-base">{item.id}</span>
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
                  <div className="flex justify-center items-center gap-1">
                    {/* <button
                      title="Excluir"
                      className="hover:bg-red-300 p-1 rounded transition-all z-10"
                      onClick={() => {
                        deleteFunction(item.id as number)
                      }}
                    >
                      <Trash size={22} />
                    </button> */}
                    <a
                      title="Acessar"
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
        {data.length < 1 && (
          <div className="flex text-sky-900 font-semibold justify-center max-h-14 max-w-xs mx-auto text-sm gap-4 items-center py-20 px-6">
            <span className="flex-1 flex justify-center">
              <img className="h-24" src={NoData} alt="No data found" />
            </span>
            <span className="flex-1 flex justify-center">
              Nenhuma informação encontrada...
            </span>
          </div>
        )}
      </div>
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
