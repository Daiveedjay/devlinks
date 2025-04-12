import { User } from "@/store/useUserStore";

export interface ApiError {
  status: number;
  message: string;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  error?: boolean;
}

export type AuthPayload = {
  email: string;
  password: string;
};

export interface AuthResponse {
  message: string;
  data?: User;
  token?: string;
  error?: boolean;
}
