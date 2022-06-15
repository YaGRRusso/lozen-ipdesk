import { FormAction, useForm } from "../context/DomainContext"

export const Header = () => {
   const { state, dispatch } = useForm()

   return (
      <header>
         <h1>Lozen Ipdesk</h1>

         <input type="text" placeholder='subdomínio...' value={state.subdomain} onChange={(ev) => dispatch({ type: FormAction.setSubdomain, payload: ev.target.value })} />
         <input type="text" placeholder='email...' value={state.email_address} onChange={(ev) => dispatch({ type: FormAction.setEmail, payload: ev.target.value })} />
         <input type="text" placeholder='password...' value={state.password} onChange={(ev) => dispatch({ type: FormAction.setPassword, payload: ev.target.value })} />
         <select onChange={(ev) => dispatch({ type: FormAction.setLocale, payload: ev.target.value })} >
            <option value="pt-br">Português</option>
            <option value="en-us">Inglês</option>
         </select>

         <hr />
      </header>
   )
}