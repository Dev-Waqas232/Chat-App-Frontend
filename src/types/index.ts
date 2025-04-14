export type ApiResponse<T = undefined> = {
  message: string;
  data: T;
};

export interface ApiErrorResponse {
  error: string;
}
