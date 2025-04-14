import axios from "axios";
import { ApiErrorResponse } from "../types";

export const getAxiosErrorMessage = (error: unknown): string => {
  console.log(error);
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.error || "Something went wrong";
  }
  return "Unexpected error occurred";
};
