import { UploadSimple } from 'phosphor-react'

export interface UploadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
}

const UploadButton = ({ active, ...rest }: UploadButtonProps) => {
  return (
    <button
      className={`${
        active ? '' : 'text-sky-900 pointer-events-none'
      } flex text-sm items-center gap-1 justify-center px-2 py-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
      {...rest}
    >
      <UploadSimple weight="bold" size={20} />
      Importar
    </button>
  )
}

export default UploadButton
