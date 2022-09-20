import { Plugs } from 'phosphor-react'

export interface ConnectionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
}

const ConnectionButton = ({ loading, ...rest }: ConnectionButtonProps) => {
  return (
    <button
      className={`${
        loading ? 'animate-spin' : ''
      } hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}
      {...rest}
    >
      <Plugs size={26} color="#075985" />
    </button>
  )
}

export default ConnectionButton
