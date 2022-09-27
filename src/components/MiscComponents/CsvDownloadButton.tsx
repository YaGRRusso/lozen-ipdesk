import { FileCsv } from 'phosphor-react'
import { useMemo } from 'react'
import Papa from 'papaparse'

export interface CsvDownloadButtonProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'download' | 'onClick'
  > {
  object: any | undefined
  title: string
  responsive?: boolean
}

const CsvDownloadButton = ({
  object,
  title,
  responsive,
  ...rest
}: CsvDownloadButtonProps) => {
  const csvFile = useMemo(() => {
    if (object && object[title.toLocaleLowerCase()]) {
      const blob = new Blob([Papa.unparse(object[title.toLocaleLowerCase()])], {
        type: 'text/csv',
      })
      const url = URL.createObjectURL(blob)
      const size = parseFloat((blob.size / 1000).toFixed(1))
      return {
        url,
        blob,
        size,
      }
    }
  }, [object])

  return (
    <a
      title="Download CSV"
      download={title.toLowerCase() + '.csv'}
      href={csvFile?.url}
      className={`${
        csvFile?.size && csvFile.size > 0
          ? ''
          : 'text-sky-900 pointer-events-none'
      } flex text-sm items-center gap-1 justify-center font-semibold px-2 py-1 rounded hover:bg-sky-700 bg-sky-800 text-white transition-all cursor-pointer`}
      {...rest}
    >
      <FileCsv weight="bold" size={20} />
      <span className={responsive ? 'hidden sm:block' : ''}>
        {csvFile?.size.toFixed(1) ?? '0.0'} kB
      </span>
    </a>
  )
}

export default CsvDownloadButton
