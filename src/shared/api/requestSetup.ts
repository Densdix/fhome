import axios from "axios";

const API_BASE_URL = "https://test-task-api.allfuneral.com";

export const $host = axios.create({
  baseURL: API_BASE_URL,
});

export const $authHost = axios.create({
  baseURL: API_BASE_URL,
});

$authHost.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$authHost.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
