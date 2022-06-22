import { Plugs } from "phosphor-react"
import { useDomainContext } from "../context/DomainContext"

type PropsTS = {
   onclick: () => void,
   loading: boolean
}

export const RefreshButton = ({ onclick, loading }: PropsTS) => {
   const { state } = useDomainContext()

   const setLocalStorage = () => {
      localStorage.setItem('zd_subdomain', state.subdomain)
      localStorage.setItem('zd_email', state.email_address)
      localStorage.setItem('zd_password', state.password)
      localStorage.setItem('zd_locale', state.locale)
   }

   return (
      <button onClick={() => {
         setLocalStorage()
         onclick()
      }}
         className={`${loading ? 'animate-spin' : ''} hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}>
         <Plugs size={26} color='#075985' />
      </button>
   )
}