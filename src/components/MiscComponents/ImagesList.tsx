import { Image } from 'phosphor-react'
import { DownloadButton } from '@components'

export interface ImagesListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  data:
    | {
        title: string
      }[]
    | undefined
}

const ImagesList = ({ data, ...rest }: ImagesListProps) => {
  return (
    <div className="relative bg-slate-50 rounded border dark:border-sky-800 dark:bg-slate-800 dark:text-slate-200">
      <div className="p-1 text-xs uppercase font-semibold bg-gray-100 border-b dark:border-sky-800 dark:bg-slate-800 dark:text-slate-200">
        Artigos com Imagens
      </div>
      <ul
        className="flex p-1 max-h-36 overflow-auto flex-col text-xs sm:text-sm items-center"
        {...rest}
      >
        {data?.map((item, index) => (
          <li
            key={index}
            className="flex items-center dark:border-sky-800 text-xs gap-1 w-full border-b border-gray-200 py-2 last:border-none"
          >
            <Image />
            {item.title}
          </li>
        ))}
      </ul>
      <span className="w-24 bottom-1 right-5 absolute">
        <DownloadButton title="ids" object={data} />
      </span>
    </div>
  )
}

export default ImagesList
