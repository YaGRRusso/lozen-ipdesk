import AppProvider from '@hooks/index'
import { PagesLayout } from './pages/PagesLayout'
import { RouteList } from './router'

const App = () => {
  return (
    <AppProvider>
      <PagesLayout children={<RouteList />} />
    </AppProvider>
  )
}

export default App
