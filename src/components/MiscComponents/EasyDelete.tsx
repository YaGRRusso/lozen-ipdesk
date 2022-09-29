import { useZendeskContext } from '@context/ZendeskContext'
import { LockOpen, Lock } from 'phosphor-react'

export interface EasyDeleteProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const EasyDelete = ({ ...rest }: EasyDeleteProps) => {
  const { easyDelete, setEasyDelete } = useZendeskContext()

  return (
    <div
      className="cursor-pointer p-1 rounded transition-all hover:bg-sky-700"
      onClick={() => setEasyDelete((oldValue) => !oldValue)}
      {...rest}
    >
      {easyDelete ? (
        <LockOpen weight="bold" size={20} />
      ) : (
        <Lock weight="bold" size={20} />
      )}
    </div>
  )
}

export default EasyDelete
