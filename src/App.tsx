import { FormProvider } from './context/DomainContext'
import { CategoryPage } from './pages/CategoryPage'
import { PagesLayout } from './pages/PagesLayout'

const App = () => {
  return (
    <FormProvider>
      <PagesLayout children={<CategoryPage />} />
    </FormProvider>
  )
}

export default App