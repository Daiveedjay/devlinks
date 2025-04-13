import { apiEndpoint } from "@/lib/constants";
import { AuthPayload, AuthResponse } from "./types/types";

import { useRouter } from "next/navigation";
import { User, useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const login = async (payload: AuthPayload): Promise<AuthResponse> => {
  const response = await fetch(`${apiEndpoint}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data: AuthResponse = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<AuthResponse, Error, AuthPayload>({
    mutationFn: login,
    onError: (error) => toast.error(error.message),

    onSuccess: (data) => {
      toast.success("Login successful!");
      setUser(data.data as User); // Assuming 'data.data' contains user info
      router.push("/");
    },
  });
};
