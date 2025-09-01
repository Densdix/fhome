import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "@/pages/login/Login";
import Main from "@/pages/main/Main";
import Organizations from "@/pages/organizations/Organizations";
import Organization from "@/pages/organization/Organization";
import Contractors from "@/pages/contractors/Contractors";
import Clients from "@/pages/clients/Clients";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import { isAuthenticated } from "@/shared/api/requestSetup";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else if (window.location.pathname === "/") {
      navigate("/organizations");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/organizations"
        element={
          <ProtectedRoute>
            <Main>
              <Organizations />
            </Main>
          </ProtectedRoute>
        }
      />
      <Route
        path="/organization/:id"
        element={
          <ProtectedRoute>
            <Main>
              <Organization />
            </Main>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contractors"
        element={
          <ProtectedRoute>
            <Main>
              <Contractors />
            </Main>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Main>
              <Clients />
            </Main>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/organizations" replace />} />

      <Route path="*" element={<Navigate to="/organizations" replace />} />
    </Routes>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
