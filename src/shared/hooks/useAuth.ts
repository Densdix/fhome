import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, removeAuthToken } from "@/shared/api/requestSetup";
import { auth } from "@/shared/api/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await auth(username);
      return true;
    } catch (err) {
      setError("Authentication failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeAuthToken();
    navigate("/login");
  };

  const checkAuth = () => {
    return isAuthenticated();
  };

  return {
    login,
    logout,
    checkAuth,
    isLoading,
    error,
    setError,
  };
};
