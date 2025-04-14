import { ApiResponse } from ".";

type Login = {
  token: string;
};

type VerifyUser = {
  name: string;
  email: string;
};

export type LoginResponse = ApiResponse<Login>;
export type UserResponse = ApiResponse<VerifyUser>;
