import { Routes } from "react-router"
import Main from "./pages/main/Main"
import { Route } from "react-router"
import Login from "./pages/login/Login"
import { useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // First check if we have a valid token
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper
