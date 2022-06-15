// Context, Reducer, Provider, Hook
import { createContext, ReactNode, useContext, useReducer } from 'react'
import { DomainTS } from '../types/types'

type ActionType = {
   type: FormAction,
   payload: any
}
type ContextType = {
   state: DomainTS,
   dispatch: (action: ActionType) => void
}
type FormProviderType = {
   children: ReactNode
}

const initialData: DomainTS = {
   email_address: import.meta.env.VITE_EMAIL ?? '',
   locale: import.meta.env.VITE_LOCALE ?? 'pt-br',
   password: import.meta.env.VITE_PASSWORD ?? '',
   subdomain: import.meta.env.VITE_SUBDOMAIN ?? ''
}


// Context
const FormContext = createContext<ContextType | undefined>(undefined)

//Reducer
export enum FormAction {
   setEmail,
   setLocale,
   setPassword,
   setSubdomain
}
const formReducer = (state: DomainTS, action: ActionType) => {
   switch (action.type) {
      case FormAction.setEmail:
         return { ...state, email_address: action.payload }
      case FormAction.setLocale:
         return { ...state, locale: action.payload }
      case FormAction.setPassword:
         return { ...state, password: action.payload }
      case FormAction.setSubdomain:
         return { ...state, subdomain: action.payload }
      default:
         return state
   }
}

// Provider
export const FormProvider = ({ children }: FormProviderType) => {
   const [state, dispatch] = useReducer(formReducer, initialData)
   const value = { state, dispatch }

   return (
      <FormContext.Provider value={value}>
         {children}
      </FormContext.Provider>
   )
}

// Hook
export const useForm = () => {
   const context = useContext(FormContext)
   if (context === undefined) {
      throw new Error('Precisa ser usado dentro do provider')
   }
   return context
}