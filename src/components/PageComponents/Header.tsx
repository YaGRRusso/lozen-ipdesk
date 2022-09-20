import { useState } from 'react'
import { useAuthContext } from '@context/AuthContext'
import {
  HeaderList,
  HeaderLoginButton,
  HeaderPasswordInput,
  HeaderSelectInput,
  HeaderTextInput,
  InfoTooltip,
} from '@components/index'

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header = ({ ...rest }: HeaderProps) => {
  const { loggedAccount, setLoggedAccount } = useAuthContext()
  const [email_address, setEmail] = useState(
    loggedAccount?.email_address ?? '' ?? ''
  )
  const [password, setPassword] = useState(loggedAccount?.password ?? '')
  const [subdomain, setSubdomain] = useState(loggedAccount?.subdomain ?? '')
  const [locale, setLocale] = useState(loggedAccount?.locale ?? 'pt-br')

  const handleLogin = () => {
    setLoggedAccount({
      email_address,
      password,
      subdomain,
      locale,
    })
  }

  return (
    <header className="bg-sky-800" {...rest}>
      <div className="max-w-screen-xl flex-wrap lg:flex-row flex-col w-11/12 mx-auto py-8 flex items-center justify-center gap-8 text-white">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          Lozen Ipdesk
          <InfoTooltip title='Para o funcionamento correto da ferramenta, é necessário instalar e ativar a extensão do Chrome "Enable CORS"' />
        </h1>
        <div className="flex flex-1 gap-3 text-black flex-col">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <HeaderTextInput
              placeholder="digite seu email..."
              value={email_address}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <HeaderPasswordInput
              placeholder="digite sua senha..."
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <HeaderTextInput
              placeholder="digite seu subdomínio..."
              value={subdomain}
              onChange={(ev) => setSubdomain(ev.target.value)}
            />
            <HeaderSelectInput
              value={locale}
              onChange={(ev) => {
                if (ev.target.value === 'pt-br' || ev.target.value === 'en-us')
                  setLocale(ev.target.value)
              }}
              options={[
                { value: 'pt-br', name: 'Português' },
                { value: 'en-us', name: 'Inglês' },
              ]}
            />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <HeaderLoginButton onClick={() => handleLogin()} />
          </div>
        </div>
      </div>
      <nav className="bg-sky-900">
        <HeaderList
          data={[
            { name: 'Categorias', local: '/' },
            { name: 'Seções', local: '/sections' },
            { name: 'Artigos', local: '/articles' },
            { name: 'Exportar', local: '/export' },
            { name: 'Importar', local: '/import' },
          ]}
        />
      </nav>
    </header>
  )
}

export default Header
