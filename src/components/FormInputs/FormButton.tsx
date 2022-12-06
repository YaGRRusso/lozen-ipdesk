import { useMemo } from 'react'

export interface FormButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  createTarget: number
  createProgress: number
}

const FormButton = ({
  createTarget,
  createProgress,
  ...rest
}: FormButtonProps) => {
  const inputName = useMemo(() => {
    if (createProgress && createTarget) {
      return `Criar (${createProgress}/${createTarget})`
    } else {
      return 'Criar'
    }
  }, [createTarget, createProgress])

  return (
    <input
      className="bg-transparent border rounded px-2 py-1 cursor-pointer transition-all w-full max-w-xs border-sky-800
         text-sky-800 dark:text-slate-200 enabled:hover:bg-sky-800 enabled:hover:text-white disabled:opacity-75 disabled:cursor-default"
      type="submit"
      value={inputName}
      {...rest}
    />
  )
}

export default FormButton
