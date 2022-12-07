import { CaretRight, CopySimple } from 'phosphor-react'
import DownloadButton from '@components/MiscComponents/DownloadButton'
import { NewOldIdProps } from '@context/ImportContext'

export interface ImportedListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  data: NewOldIdProps
}

const ImportedList = ({ data, ...rest }: ImportedListProps) => {
  return (
    <div className="relative bg-slate-50 rounded border dark:border-sky-800 dark:bg-slate-800 dark:text-slate-200">
      <div className="p-1 text-xs uppercase font-semibold bg-gray-100 border-b dark:border-sky-800 dark:bg-slate-800 dark:text-slate-200">
        Novos IDs
      </div>
      <ul
        className="flex p-1 max-h-72 overflow-auto flex-col text-xs sm:text-sm items-center"
        {...rest}
      >
        {data?.newOldIds?.map((item) => (
          <li
            key={item.newId}
            className="flex flex-col dark:border-sky-800 w-full border-b border-gray-200 py-2 last:border-none"
          >
            <div className="text-xs whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
              {item?.title}
            </div>
            <div className="font-mono flex gap-1 items-center justify-start">
              <span
                title="Copiar"
                className="text-red-700 hover:bg-red-100 rounded cursor-pointer gap-1 flex items-center"
                onClick={() =>
                  navigator.clipboard.writeText(item.oldId.toString())
                }
              >
                <CopySimple />
                {item.oldId}
              </span>
              <CaretRight size={10} weight="bold" />
              <span
                title="Copiar"
                className="text-green-700 hover:bg-green-100 rounded cursor-pointer gap-1 flex items-center"
                onClick={() =>
                  navigator.clipboard.writeText(item.newId.toString())
                }
              >
                <CopySimple />
                {item.newId}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <span className="w-24 bottom-1 right-5 absolute">
        <DownloadButton title={data.target + '-ids'} object={data} />
      </span>
    </div>
  )
}

export default ImportedList
