import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./widgets/Header";
import Footer from "./widgets/Footer";
import {ROUTES} from "./shared/config/routes";

function App() {
  return (
      <BrowserRouter>
          <div className="px-4 sm:px-6 lg:px-8">
              <Header />
              <main>
                  <Routes>
                      {Object.entries(ROUTES).map(([key, route]) => {
                          const Component = route.component;
                          return (
                              <Route
                                  key={key}
                                  path={route.path}
                                  element={<Component />}
                              />
                          );
                      })}
                  </Routes>
              </main>
              <Footer />
          </div>
      </BrowserRouter>
  )
}

export default App