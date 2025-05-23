import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const plainAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.log("Error", error);
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // No token at all, immediately redirect
    const token = localStorage.getItem("token");
    if (error.response?.status === 401 && !token) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Token exists but maybe expired — try refresh flow
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await plainAxios.post("/auth/refresh");
          const newToken = res.data.data.token;

          localStorage.setItem("token", newToken);

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed — redirect to login
          localStorage.removeItem("token");
          window.location.href = "/login";

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
