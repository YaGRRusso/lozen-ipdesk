import { Eye, EyeSlash } from 'phosphor-react'
import { useState } from 'react'

export interface HeaderPasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element
}

const HeaderPasswordInput = ({ icon, ...rest }: HeaderPasswordInputProps) => {
  const [showingPass, setShowingPass] = useState(false)

  return (
    <div className="flex-1 flex items-center relative min-w-sm">
      <div className="absolute text-lg left-1.5 text-gray-500">{icon}</div>
      <input
        type={showingPass ? 'text' : 'password'}
        className="w-full p-1 rounded pl-7 pr-8"
        {...rest}
      />
      <button
        title="Mostrar/Ocultar"
        className="hover:bg-gray-200 transition-all px-0.5 rounded absolute right-1 text-xl"
        onClick={() => setShowingPass(!showingPass)}
      >
        {showingPass ? <Eye /> : <EyeSlash />}
      </button>
    </div>
  )
}

export default HeaderPasswordInput
