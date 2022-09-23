import { DownloadSimple } from 'phosphor-react'
import { useMemo } from 'react'

export interface DownloadButtonProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'download' | 'onClick'
  > {
  object: any
  title: string
}

const DownloadButton = ({ object, title, ...rest }: DownloadButtonProps) => {
  const jsonFile = useMemo(() => {
    if (object) {
      const json = JSON.stringify(object)
      const blob = new Blob([json], { type: 'text/json' })
      const url = URL.createObjectURL(blob)
      return {
        url,
        blob,
      }
    }
    return {
      url: '',
      blob: new Blob(),
    }
  }, [object])

  return (
    <a
      title="Download"
      onClick={() => console.log(object)}
      download={title.toLowerCase() + '.json'}
      href={jsonFile?.url}
      className="flex text-sm items-center gap-1 justify-center font-semibold px-2 py-1 rounded hover:bg-sky-700 bg-sky-800 text-white transition-all cursor-pointer"
      {...rest}
    >
      <DownloadSimple weight="bold" size={20} />
      {(jsonFile.blob.size / 1000).toFixed(1) + ' kB'}
    </a>
  )
}

export default DownloadButton
