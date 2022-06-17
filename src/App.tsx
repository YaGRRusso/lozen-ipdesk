import { FormProvider } from './context/DomainContext'
import { PagesLayout } from './pages/PagesLayout'
import { RouteList } from './router'

const App = () => {
  return (
    <FormProvider>
      <PagesLayout children={<RouteList />} />
    </FormProvider>
  )
}

export default App