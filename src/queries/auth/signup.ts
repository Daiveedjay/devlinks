import { apiEndpoint } from "@/lib/constants";
import { Link } from "@/store/useLinkStore";
import { User, useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type ApiResponse =
  | {
      data: Link[];
      message: string;
      error?: undefined;
    }
  | {
      error: string;
      data?: undefined;
      message?: undefined;
    };

export function isErrorResponse<T extends Record<string, unknown>>(
  response: T
): response is T & { error: string } {
  return "error" in response;
}

export type AuthPayload = {
  email: string;
  password: string;
};

export type AuthResponse =
  | {
      token: string;
      user: User;
      message: string;
      error?: undefined;
    }
  | {
      error: string;
      data?: undefined;
      message?: undefined;
    };

const signup = async (payload: AuthPayload): Promise<AuthResponse> => {
  const response = await fetch(`${apiEndpoint}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.message || "Signup failed";
    throw new Error(message); // Throw an error if the response is not ok
  }

  return response.json();
};

export const useSignup = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (payload: AuthPayload) => {
      return signup(payload); // Use the extracted signup function
    },

    onError: (error) => {
      // Show the error message from the error thrown in the signup function
      toast.error(error.message || "Signup failed");
    },

    onSuccess: (data) => {
      if (isErrorResponse(data)) {
        // If it's an error response, show the error message
        toast.error(data.error);
        return;
      }

      // If it's a successful response, proceed with the logic
      toast("Account created successfully!");

      // localStorage.setItem("auth-token", data.token);

      setUser(data.user);
      router.push("/");
    },
  });
};
