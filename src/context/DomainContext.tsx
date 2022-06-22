// Context, Reducer, Provider, Hook
import { createContext, ReactNode, useContext, useReducer } from 'react'
import { DomainTS } from '../types/apiType'

type ActionType = {
   type: DomainAction,
   payload: any
}
type ContextType = {
   state: DomainTS,
   dispatch: (action: ActionType) => void
}
type DomainProviderType = {
   children: ReactNode
}

const initialData: DomainTS = {
   email_address: import.meta.env.VITE_EMAIL ?? localStorage.getItem('zd_email') ?? '',
   locale: import.meta.env.VITE_LOCALE ?? localStorage.getItem('zd_locale') ?? 'pt-br',
   password: import.meta.env.VITE_PASSWORD ?? localStorage.getItem('zd_password') ?? '',
   subdomain: import.meta.env.VITE_SUBDOMAIN ?? localStorage.getItem('zd_subdomain') ?? ''
}


// Context
const DomainContext = createContext<ContextType | undefined>(undefined)

//Reducer
export enum DomainAction {
   setEmail,
   setLocale,
   setPassword,
   setSubdomain
}
const formReducer = (state: DomainTS, action: ActionType) => {
   switch (action.type) {
      case DomainAction.setEmail:
         return { ...state, email_address: action.payload }
      case DomainAction.setLocale:
         return { ...state, locale: action.payload }
      case DomainAction.setPassword:
         return { ...state, password: action.payload }
      case DomainAction.setSubdomain:
         return { ...state, subdomain: action.payload }
      default:
         return state
   }
}

// Provider
export const DomainProvider = ({ children }: DomainProviderType) => {
   const [state, dispatch] = useReducer(formReducer, initialData)
   const value = { state, dispatch }

   return (
      <DomainContext.Provider value={value}>
         {children}
      </DomainContext.Provider>
   )
}

// Hook
export const useDomainContext = () => {
   const context = useContext(DomainContext)
   if (context === undefined) {
      throw new Error
   }
   return context
}