import { DomainAction, useDomainContext } from "../../context/DomainContext"
import { HeaderList } from "./HeaderList"
import { HeaderFormInput } from "./HeaderFormInput"

export const Header = () => {
   const { state } = useDomainContext()

   return (
      <header className="bg-sky-800">
         <div className="py-8 px-2 flex items-center justify-evenly text-white gap-8 flex-wrap">
            <h1 className="text-4xl font-bold">Lozen Ipdesk</h1>
            <div className="flex w-2/3 gap-2 text-black flex-wrap">
               <HeaderFormInput data={{
                  value: state.subdomain, dispatch: DomainAction.setSubdomain,
                  type: 'text', placeholder: 'digite seu subdomínio...'
               }} />
               <HeaderFormInput data={{
                  value: state.email_address, dispatch: DomainAction.setEmail,
                  type: 'text', placeholder: 'digite seu email...'
               }} />
               <HeaderFormInput data={{
                  value: state.password, dispatch: DomainAction.setPassword,
                  type: 'password', placeholder: 'digite sua senha...'
               }} />
               <HeaderFormInput data={{
                  value: state.password, dispatch: DomainAction.setPassword,
                  type: 'select', options: [
                     { value: 'pt-br', name: 'Português' },
                     { value: 'en-us', name: 'Inglês' }
                  ]
               }} />

            </div>
         </div>
         <nav className="bg-sky-900">
            <HeaderList data={[
               { name: 'Categorias', local: '/' },
               { name: 'Sections', local: '/sections' },
               { name: 'Artigos', local: '/articles' }
            ]} />
         </nav>
      </header>
   )
}