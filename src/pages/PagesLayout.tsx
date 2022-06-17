import { Header } from "../components/Header/Header"

type PropsTS = {
   children: JSX.Element
}

export const PagesLayout = ({ children }: PropsTS) => {
   return (
      <>
         <Header />
         <section className="max-w-screen-xl w-11/12 mx-auto my-10 min-h-screen-60">
            {children}
         </section>
         <footer className="bg-sky-800 p-6 text-white text-center">Desenvolvido de ❤ para uso interno da Aktie Now</footer>
      </>
   )
}