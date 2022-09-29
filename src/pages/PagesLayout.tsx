import { EasyDelete, ErrorToast, Header } from '@components/index'
import { Info } from 'phosphor-react'

type PagesLayoutProps = {
  children: JSX.Element
}

export const PagesLayout = ({ children }: PagesLayoutProps) => {
  return (
    <>
      <header className="bg-sky-800">
        <Header />
      </header>
      <ErrorToast />
      <section className="max-w-screen-xl w-11/12 mx-auto my-10 min-h-screen-fill flex flex-col gap-8">
        {children}
      </section>
      <footer className="bg-sky-800 p-8 text-white gap-4 text-center flex flex-col items-center justify-center">
        Desenvolvido de ❤ para uso interno da Aktie Now
        <EasyDelete />
      </footer>
    </>
  )
}
