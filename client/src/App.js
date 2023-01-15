import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import { AuthContext } from './context/AuthContext';
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from "./routes";

import { Footer } from "./partials/footer"
import { Header } from "./partials/header"

function App() {

  const {login, logout, token, userId, userName, userEmail} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, userName, userEmail, isAuthenticated
    }}>
      <Router>
        <div className="container">
          <Header />
          {routes}
          <Footer />
          <ToastContainer
            limit={3}
            newestOnTop={false}
            rtl={false}
           />
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
