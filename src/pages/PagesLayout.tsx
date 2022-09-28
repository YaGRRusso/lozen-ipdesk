import { ErrorToast, Header } from '@components/index'
import { useZendeskContext } from '@context/ZendeskContext'
import { Lock, LockOpen } from 'phosphor-react'

type PagesLayoutProps = {
  children: JSX.Element
}

export const PagesLayout = ({ children }: PagesLayoutProps) => {
  const { easyDelete, setEasyDelete } = useZendeskContext()

  return (
    <>
      <header className="bg-sky-800">
        <Header />
      </header>
      <ErrorToast />
      <section className="max-w-screen-xl w-11/12 mx-auto my-10 min-h-screen-fill flex flex-col gap-8">
        {children}
      </section>
      <footer className="bg-sky-800 p-6 text-white text-center flex flex-col gap-2 items-center justify-center">
        Desenvolvido de ❤ para uso interno da Aktie Now
        {easyDelete ? (
          <span
            className="cursor-pointer p-1 rounded transition-all hover:bg-sky-700"
            onClick={() => setEasyDelete(false)}
          >
            <LockOpen weight="bold" size={18} />
          </span>
        ) : (
          <span
            className="cursor-pointer p-1 rounded transition-all hover:bg-sky-700"
            onClick={() => setEasyDelete(true)}
          >
            <Lock weight="bold" size={18} />
          </span>
        )}
      </footer>
    </>
  )
}
