import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./widgets/Header";
import Footer from "./widgets/Footer";
import {ROUTES} from "./shared/config/routes";
import RequireAuth from "./presentation/view/auth/RequireAuth";
import AuthModal from "./presentation/view/auth/AuthModal";
import {authViewModel} from "./di";

function App() {
  return (
      <BrowserRouter>
          <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
              <Header/>
              <main className="flex-1">
                  <Routes>
                      {Object.entries(ROUTES).map(([key, route]) => {
                          const Component = route.component;
                          const requiresAuth = 'requiresAuth' in route && route.requiresAuth;
                          const element = requiresAuth
                              ? <RequireAuth authViewModel={authViewModel}><Component /></RequireAuth>
                              : <Component />;
                          return <Route key={key} path={route.path} element={element} />;
                      })}
                  </Routes>
              </main>
              <Footer />
              <AuthModal authViewModel={authViewModel} />
          </div>
      </BrowserRouter>
  )
}

export default App
