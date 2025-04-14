import { ApiResponse } from ".";

type Login = {
  token: string;
};

export type LoginResponse = ApiResponse<Login>;
