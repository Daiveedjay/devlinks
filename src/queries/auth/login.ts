import { apiEndpoint } from "@/lib/constants";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthPayload, AuthResponse, isErrorResponse } from "./signup";

const login = async (payload: AuthPayload): Promise<AuthResponse> => {
  const response = await fetch(`${apiEndpoint}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error); // Throw an error if the response is not ok
  }

  return response.json();
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (payload: AuthPayload) => {
      return login(payload); // Use the extracted login function
    },
    onError: (error) => {
      // Show the error message from the error thrown in the signup function
      toast.error(error.message);
    },

    onSuccess: (data) => {
      if (isErrorResponse(data)) {
        // If it's an error response, show the error message
        toast.error(data.error);
        return;
      }
      toast("Login successful!");
      // localStorage.setItem("auth-token", data.token);
      setUser(data.user);
      router.push("/");
    },
  });
};
