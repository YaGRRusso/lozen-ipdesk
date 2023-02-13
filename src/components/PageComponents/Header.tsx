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
  const [domain, setDomain] = useState(loggedAccount?.domain ?? '')
  const [locale, setLocale] = useState(loggedAccount?.locale ?? 'pt-br')

  const handleLogin = () => {
    setLoggedAccount({
      email_address,
      password,
      // Remove o HTTPS:// do domínio, o que o torna opcional podendo passar tanto "https://dominio.com" ou apenas "domínio.com"
      domain: domain.replace(/(^\w+:|^)\/\//, ''),
      locale,
    })
  }

  return (
    <>
      <div
        className="max-w-screen-xl flex-wrap lg:flex-row flex-col w-11/12 mx-auto py-8 flex items-center justify-center gap-8 text-white"
        {...rest}
      >
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          Lozen Ipdesk
          <InfoTooltip title='Para o funcionamento correto da ferramenta, é necessário instalar e ativar a extensão do Chrome "Enable CORS"' />
        </h1>
        <div className="flex flex-1 gap-3 text-black flex-col">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <HeaderTextInput
              placeholder="digite seu domínio..."
              value={domain}
              onChange={(ev) => setDomain(ev.target.value)}
            />
            <HeaderSelectInput
              value={locale}
              onChange={(ev) => {
                if (ev.target.value === 'pt-br' || ev.target.value === 'en-us')
                  setLocale(ev.target.value)
              }}
              options={[
                { value: 'pt-br', name: 'Português' },
                { value: 'en-us', name: 'English' },
              ]}
            />
          </div>
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
            <HeaderLoginButton onClick={() => handleLogin()} />
          </div>
        </div>
      </div>
      <nav className="bg-sky-900 dark:bg-sky-800">
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
    </>
  )
}

export default Header
