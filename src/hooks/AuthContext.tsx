import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthProps, ThemeProps } from '@customTypes/ApiType'

interface AuthContextProps {
  loggedAccount: AuthProps | undefined
  setLoggedAccount: (data: AuthProps) => void
  theme: ThemeProps
  setTheme: (data: ThemeProps) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const initialData = (): AuthProps | undefined => {
  const envAccount = {
    email_address: import.meta.env.VITE_EMAIL,
    password: import.meta.env.VITE_PASSWORD,
    domain: import.meta.env.VITE_domain,
    locale: import.meta.env.VITE_LOCALE,
  }
  const localAccount = localStorage.getItem('lozenUser')

  if (
    envAccount.email_address &&
    envAccount.password &&
    envAccount.domain &&
    envAccount.locale
  ) {
    return {
      email_address: envAccount.email_address,
      password: envAccount.password,
      domain: envAccount.domain,
      locale: envAccount.locale,
    }
  }

  if (localAccount) {
    const parsedLocalAccount: AuthProps = JSON.parse(localAccount)
    return {
      email_address: parsedLocalAccount.email_address,
      password: parsedLocalAccount.password,
      domain: parsedLocalAccount.domain,
      locale: parsedLocalAccount.locale,
    }
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<AuthProps | undefined>(initialData())
  const [theme, setTheme] = useState<ThemeProps>('light')

  useEffect(() => {
    let localTheme = localStorage.getItem('lozenTheme')

    if (!localTheme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localTheme = 'dark'
      } else {
        localTheme = 'light'
      }
      localStorage.setItem('lozenTheme', localTheme)
    }

    setTheme(localTheme as ThemeProps)
  }, [])

  const handleChangeTheme = (data: ThemeProps) => {
    setTheme(data)
    localStorage.setItem('lozenTheme', data)
  }

  const setLoggedAccount = (data: AuthProps) => {
    localStorage.setItem('lozenUser', JSON.stringify(data))
    setAccount(data)
  }

  return (
    <AuthContext.Provider
      value={{
        loggedAccount: account,
        setLoggedAccount,
        setTheme: handleChangeTheme,
        theme,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error()
  }
  return context
}
