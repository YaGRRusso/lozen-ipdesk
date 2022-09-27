import { DownloadSimple } from 'phosphor-react'
import { useMemo } from 'react'

export interface DownloadButtonProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'download' | 'onClick'
  > {
  object: any
  title: string
  responsive?: boolean
}

const DownloadButton = ({
  object,
  title,
  responsive,
  ...rest
}: DownloadButtonProps) => {
  const jsonFile = useMemo(() => {
    if (object) {
      const json = JSON.stringify(object)
      const blob = new Blob([json], { type: 'text/json' })
      const url = URL.createObjectURL(blob)
      const size = (blob.size / 1000).toFixed(1)
      return {
        url,
        blob,
        size,
      }
    }
  }, [object])

  return (
    <a
      title="Download"
      onClick={() => console.log(object)}
      download={title.toLowerCase() + '.json'}
      href={jsonFile?.url}
      className={`${
        jsonFile ? '' : 'text-sky-900 pointer-events-none'
      } flex text-sm items-center gap-1 justify-center font-semibold px-2 py-1 rounded hover:bg-sky-700 bg-sky-800 text-white transition-all cursor-pointer`}
      {...rest}
    >
      <DownloadSimple weight="bold" size={20} />
      <span className={responsive ? 'hidden sm:block' : ''}>
        {jsonFile?.size ?? '0.0'} kB
      </span>
    </a>
  )
}

export default DownloadButton
