
import { extendTheme } from "@chakra-ui/react";
import { dividerTheme } from "./components/Divider.js";

import "./App.css";
import { Navigate, Link, BrowserRouter, Route, Routes } from "react-router-dom";

import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home.js";
import Admin from "./pages/Admin";
import Protected from "./components/Protected";
export const theme = extendTheme({
  components: { Divider: dividerTheme },
});

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
        path="/login"
        element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
      ></Route>
      <Route
        path="/admin"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Admin />
          </Protected>
        }
      ></Route>
    </Routes>
  </BrowserRouter>
  )
  
      }

export default App;