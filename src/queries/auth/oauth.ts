import { apiEndpoint } from "@/lib/constants";
import { User, useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiResponse } from "./types/types";

export const useAuthCallback = () => {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  return useMutation<ApiResponse<User> | undefined, Error>({
    mutationFn: async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) return;

      // Cookies.set("auth-token", token, { expires: 7, secure: true });

      const res = await fetch(`${apiEndpoint}/me`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user info");

      const response: ApiResponse<User> = await res.json();
      if (response.error) throw new Error(response.message);

      return response;
    },
    onSuccess: (response) => {
      if (!response?.data) return;
      // toast.success("Login successful!");
      toast("Login successful!", {
        className: "success-toast",
        // description: "With a description and an icon",
        duration: 2000,
        // icon: <CircleCheck />,
      });
      setUser(response.data);
      router.push("/");
    },
    onError: (err: Error) => {
      // toast.error(err.message || "Authentication failed");
      toast(err.message || "Authentication failed", {
        className: "error-toast ",
        // description: "With a description and an icon",
        duration: 2000,
        // icon: <ShieldAlert />,
      });
    },
  });
};
