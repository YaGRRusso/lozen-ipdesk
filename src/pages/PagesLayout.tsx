import { Toast, Footer, Header } from '@components/index'
import { useAuthContext } from '@context/AuthContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

type PagesLayoutProps = {
  children: JSX.Element
}

export const PagesLayout = ({ children }: PagesLayoutProps) => {
  const { theme } = useAuthContext()

  useEffect(() => {
    toast.info('Habilite o CORS', {
      position: 'top-left',
      autoClose: 3000,
    })
  }, [])

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="dark:bg-slate-900">
        <header className="bg-sky-800 dark:bg-sky-900">
          <Header />
        </header>
        <Toast />
        <section className="max-w-screen-xl w-11/12 mx-auto my-10 min-h-screen-fill flex flex-col gap-8">
          {children}
        </section>
        <footer className="bg-sky-800 dark:bg-sky-900">
          <Footer />
        </footer>
      </div>
    </div>
  )
}
