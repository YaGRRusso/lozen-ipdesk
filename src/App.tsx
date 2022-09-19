import { AuthProvider } from "./context/AuthContext";
import { ImportProvider } from "./context/ImportContext";
import { ZendeskProvider } from "./context/ZendeskContext";
import { PagesLayout } from "./pages/PagesLayout";
import { RouteList } from "./router";

const App = () => {
  return (
    <AuthProvider>
      <ZendeskProvider>
        <ImportProvider>
          <PagesLayout children={<RouteList />} />
        </ImportProvider>
      </ZendeskProvider>
    </AuthProvider>
  );
};

export default App;
