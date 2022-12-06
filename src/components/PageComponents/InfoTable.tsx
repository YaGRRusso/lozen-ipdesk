import { useZendeskContext } from '@context/ZendeskContext'
import { ArrowClockwise, ArrowSquareIn, Image, Trash } from 'phosphor-react'
import NoData from '/assets/no-data.svg'
import { Pagination, FormSearch } from '@components/index'

export interface InfoTableRowsProps {
  id: number
  name: string
  link: string
  parentId?: number
  warning?: boolean
  image?: boolean
}

export interface InfoTableProps extends React.HTMLAttributes<HTMLTableElement> {
  titles: string[]
  data: InfoTableRowsProps[]
  count: number
  infoLoading: boolean
  refreshInfo: () => void
  deleteInfo: (id: number) => void
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  totalPages: number
}

const InfoTable = ({
  titles,
  data,
  count,
  infoLoading,
  refreshInfo,
  deleteInfo,
  setCurrentPage,
  currentPage,
  totalPages,
  ...rest
}: InfoTableProps) => {
  const { easyDelete } = useZendeskContext()

  return (
    <div className="flex flex-col gap-4">
      <div className="shadow dark:shadow-slate-700 rounded">
        <table
          className="w-full border-separate border-spacing-0 rounded overflow-hidden"
          {...rest}
        >
          <thead className="bg-sky-800 dark:bg-sky-900 text-white text-left">
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
                    refreshInfo()
                    setCurrentPage(1)
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
                  item.warning
                    ? 'bg-red-50 dark:bg-red-800 dark:hover:bg-red-800 hover:bg-red-100 text-red-900'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-gray-300'
                } transition-all`}
                key={item.id}
              >
                <td className="p-2">
                  <div className="flex flex-col">
                    <span className="sm:hidden text-xs opacity-70">
                      {item.parentId}
                    </span>
                    <span className="sm:hidden inline">
                      {item.image && <Image size={15} className="inline" />}{' '}
                      {item.name}
                    </span>
                    <span className="text-sm sm:text-base">{item.id}</span>
                  </div>
                </td>
                <td className="p-2 hidden sm:table-cell">
                  <span className="inline">
                    {item.image && <Image size={15} className="inline" />}{' '}
                    {item.name}
                  </span>
                </td>
                {item.parentId && (
                  <td className="p-2 hidden sm:table-cell">{item.parentId}</td>
                )}
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1">
                    {easyDelete && (
                      <button
                        title="Excluir"
                        className="hover:bg-red-300 p-1 rounded transition-all z-10"
                        onClick={() => {
                          deleteInfo(item.id as number)
                        }}
                      >
                        <Trash size={22} />
                      </button>
                    )}
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
          <div className="flex text-sky-900 dark:text-white font-semibold justify-center max-h-14 max-w-xs mx-auto text-sm gap-4 items-center py-20 px-6">
            <span className="flex-1 flex justify-center">
              <img className="h-24" src={NoData} alt="No data found" />
            </span>
            <span className="flex-1 flex justify-center">
              Nenhuma informação encontrada...
            </span>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageChange={setCurrentPage}
      />
    </div>
  )
}

export default InfoTable
