import { useState } from 'react'

export type FileImportResponseProps = {
  file: File | null
  error?: string
}

export interface FormFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  infoLoading: boolean
  fileImport: (data: FileImportResponseProps) => void
  fileTypes: string[]
}

const FormFile = ({
  infoLoading,
  fileImport,
  fileTypes,
  ...rest
}: FormFileProps) => {
  const [dragOver, setDragOver] = useState(false)

  const handleFileParse = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      const currentFile = ev.target.files[0]
      if (!fileTypes.includes(currentFile.type)) {
        fileImport({
          file: null,
          error: 'Formato de arquivo inválido',
        })
      } else {
        fileImport({
          file: currentFile,
        })
      }
    } else {
      fileImport({ file: null })
    }
  }

  return (
    <input
      className={`${
        dragOver
          ? 'py-12 bg-slate-100 dark:bg-slate-700 border-slate-400 text-slate-900'
          : 'py-6'
      } bg-slate-50 dark:bg-slate-800 dark:text-slate-200 disabled:p-2 rounded disabled:pointer-events-none hover:bg-slate-100 cursor-pointer transition-all duration-300 border-dashed border-2 border-slate-300 hover:border-slate-400 dark:border-slate-600 text-slate-800 disabled:text-slate-400 hover:text-slate-900 w-full px-6`}
      type="file"
      disabled={infoLoading}
      onChange={(ev) => handleFileParse(ev)}
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => setDragOver(false)}
      {...rest}
    />
  )
}

export default FormFile
