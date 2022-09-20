import { SignIn } from 'phosphor-react'

export interface HeaderLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const HeaderLoginButton = ({ ...rest }: HeaderLoginButtonProps) => {
  return (
    <button
      className="p-1 rounded bg-white w-full flex items-center justify-center gap-2 transition-all hover:bg-sky-100"
      {...rest}
    >
      Entrar
      <SignIn size={20} />
    </button>
  )
}

export default HeaderLoginButton
