import { ApiResponse } from "../types";
import { LoginResponse } from "../types/auth";
import axiosInstance from "./api";

export const register = async (body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  const response = await axiosInstance.post("/auth/register", body);
  return response.data;
};

export const login = async (body: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", body);
  return response.data;
};
