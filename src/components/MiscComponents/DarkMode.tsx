import { useAuthContext } from '@context/AuthContext'
import { Moon, Sun } from 'phosphor-react'

export interface DarkModeProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const DarkMode = ({ ...rest }: DarkModeProps) => {
  const { theme, setTheme } = useAuthContext()

  const handleChangeTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <div
      className="cursor-pointer p-1 rounded transition-all hover:bg-sky-700"
      onClick={handleChangeTheme}
      {...rest}
    >
      {theme === 'dark' ? (
        <Moon weight="bold" size={20} />
      ) : (
        <Sun weight="bold" size={20} />
      )}
    </div>
  )
}

export default DarkMode
