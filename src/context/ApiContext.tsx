// Context, Reducer, Provider, Hook
import { createContext, ReactNode, useContext, useReducer } from 'react'
import { ApiContextTS } from '../types/apiType'

type ActionType = {
   type: ApiAction,
   payload: any
}

type ContextType = {
   state: ApiContextTS
   dispatch: (action: ActionType) => void
}
type ApiProviderType = {
   children: ReactNode
}

const initialData: ApiContextTS = {
   categories: null,
   sections: null,
   articles: null
}


// Context
const ApiContext = createContext<ContextType | undefined>(undefined)

//Reducer
export enum ApiAction {
   setCategories,
   setSections,
   setArticles
}
const formReducer = (state: ApiContextTS, action: ActionType) => {
   switch (action.type) {
      case ApiAction.setCategories:
         return { ...state, categories: action.payload }
      case ApiAction.setSections:
         return { ...state, sections: action.payload }
      case ApiAction.setArticles:
         return { ...state, articles: action.payload }
      default:
         return state
   }
}

// Provider
export const ApiProvider = ({ children }: ApiProviderType) => {
   const [state, dispatch] = useReducer(formReducer, initialData)
   const value = { state, dispatch }

   return (
      <ApiContext.Provider value={value}>
         {children}
      </ApiContext.Provider>
   )
}

// Hook
export const useApiContext = () => {
   const context = useContext(ApiContext)
   if (context === undefined) {
      throw new Error
   }
   return context
}