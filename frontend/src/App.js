import "./App.css";
import { Navigate, Link, BrowserRouter, Route, Routes } from "react-router-dom";

import { useState } from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home.js";
import Admin from "./pages/Admin/Admin.js";
import Student from "./pages/Student/Student";
import Protected from "./components/Protected";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/student" element={<Student />}></Route>
        <Route
          path="/login"
          element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
        ></Route>
        <Route
          path="/admin"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Admin isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            </Protected>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
