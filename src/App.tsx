import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./widgets/Header.tsx";
import Footer from "./widgets/Footer.tsx";
import {ROUTES} from "./shared/config/routes.ts";

function App() {
  return (
      <BrowserRouter>
          <div className="px-4 sm:px-6 lg:px-8">
              <Header></Header>
              <main>
                  <Routes>
                      {Object.entries(ROUTES).map(([key, route]) => (
                          <Route
                              key={key}
                              path={route.path}
                              element={<route.component />}
                          />
                      ))}
                  </Routes>
              </main>
              <Footer></Footer>
          </div>
      </BrowserRouter>
  )
}

export default App