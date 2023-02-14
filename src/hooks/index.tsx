import { AuthProvider } from './AuthContext'
import { ImportProvider } from './ImportContext'
import { ZendeskProvider } from './ZendeskContext'

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ZendeskProvider>
      <ImportProvider>{children}</ImportProvider>
    </ZendeskProvider>
  </AuthProvider>
)

export default AppProvider
