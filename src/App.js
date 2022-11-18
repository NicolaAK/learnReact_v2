import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import { AuthCotext } from "./context";
import "./Style/App.css"

function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <AuthCotext.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthCotext.Provider>
  )
}

export default App;
