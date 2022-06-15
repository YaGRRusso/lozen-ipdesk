import { FormProvider } from './context/DomainContext'
import { CategoryPage } from './pages/CategoryPage'

const App = () => {
  return (
    <FormProvider>
      <CategoryPage />
    </FormProvider>
  )
}

export default App