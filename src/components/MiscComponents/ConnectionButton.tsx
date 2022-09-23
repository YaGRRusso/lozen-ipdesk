import { Plugs } from 'phosphor-react'

export interface ConnectionButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean
}

const ConnectionButton = ({ loading, ...rest }: ConnectionButtonProps) => {
  return (
    <div
      title="Desconectado"
      className={`${
        loading ? 'animate-spin' : ''
      } border border-sky-800 rounded-full m-4 p-2 mx-auto block`}
      {...rest}
    >
      <Plugs size={26} color="#075985" />
    </div>
  )
}

export default ConnectionButton
