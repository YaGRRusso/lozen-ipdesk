import { ApiProvider } from './context/ApiContext'
import { DomainProvider } from './context/DomainContext'
import { PagesLayout } from './pages/PagesLayout'
import { RouteList } from './router'

const App = () => {
  return (
    <DomainProvider>
      <ApiProvider>
        <PagesLayout children={<RouteList />} />
      </ApiProvider>
    </DomainProvider>
  )
}

export default App