import { CaretRight, CopySimple } from 'phosphor-react'
import DownloadButton from '@components/MiscComponents/DownloadButton'

export interface ImportedListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  importedList: {
    title: string
    old: number
    new: number
  }[]
}

const ImportedList = ({ importedList, ...rest }: ImportedListProps) => {
  return (
    <div className="relative bg-slate-50 rounded border">
      <div className="p-1 text-xs uppercase font-semibold bg-gray-100 border-b">
        Novos IDs
      </div>
      <ul
        className="flex p-1 max-h-72 overflow-auto flex-col text-xs sm:text-sm items-center"
        {...rest}
      >
        {importedList?.map((item) => (
          <li
            key={item.new}
            className="flex flex-col w-full border-b border-gray-200 py-2 last:border-none"
          >
            <div className="text-xs whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
              {item.title}
            </div>
            <div className="font-mono flex gap-1 items-center justify-start">
              <span
                className="text-red-700 hover:bg-red-100 rounded cursor-pointer gap-1 flex items-center"
                onClick={() =>
                  navigator.clipboard.writeText(item.old.toString())
                }
              >
                <CopySimple />
                {item.old}
              </span>
              <CaretRight size={10} weight="bold" />
              <span
                className="text-green-700 hover:bg-green-100 rounded cursor-pointer gap-1 flex items-center"
                onClick={() =>
                  navigator.clipboard.writeText(item.new.toString())
                }
              >
                <CopySimple />
                {item.new}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <span className="w-24 bottom-1 right-5 absolute">
        <DownloadButton title="ids" object={importedList} />
      </span>
    </div>
  )
}

export default ImportedList
