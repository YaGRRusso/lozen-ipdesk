import { AuthProvider } from "./context/AuthContext";
import { ZendeskProvider } from "./context/ZendeskContext";
import { PagesLayout } from "./pages/PagesLayout";
import { RouteList } from "./router";

const App = () => {
  return (
    <AuthProvider>
      <ZendeskProvider>
        <PagesLayout children={<RouteList />} />
      </ZendeskProvider>
    </AuthProvider>
  );
};

export default App;
