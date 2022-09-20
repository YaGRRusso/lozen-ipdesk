import { Warning } from 'phosphor-react'

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  message: string
}

const ErrorMessage = ({ message, ...rest }: ErrorMessageProps) => {
  return (
    <span
      className="text-xs font-bold uppercase text-red-600 flex items-center gap-2"
      {...rest}
    >
      <Warning size={18} weight="bold" />
      {message}
    </span>
  )
}

export default ErrorMessage
