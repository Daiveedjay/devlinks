import { apiEndpoint, TOAST_TIMEOUT } from "@/lib/constants";
import { User, useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthPayload, AuthResponse } from "./types/types";

const signup = async (payload: AuthPayload): Promise<AuthResponse> => {
  const response = await fetch(`${apiEndpoint}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data: AuthResponse = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.message || "Signup failed"); // Throw an error if the response is not ok
  }

  return data;
};

export const useSignup = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<AuthResponse, Error, AuthPayload>({
    mutationFn: signup, // Use the extracted signup

    onError: (error) =>
      toast(error.message, {
        className: "error-toast",
        // description: "With a description and an icon",
        duration: TOAST_TIMEOUT,
        // icon: <ShieldAlert />,
      }),
    // toast.error(error.message),

    onSuccess: (data) => {
      // toast("Account created successfully!");
      toast("Account created successfully!", {
        className: "success-toast",
        // description: "With a description and an icon",
        duration: TOAST_TIMEOUT,
        // icon: <CircleCheck />,
      });
      setUser(data.data as User);
      router.push("/");
      window.location.reload();
    },
  });
};
