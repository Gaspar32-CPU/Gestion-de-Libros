import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from "./context/AuthProvider";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
