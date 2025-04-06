import { apiEndpoint } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useLinkStore } from "@/store/useLinkStore";
import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const logout = async () => {
  const response = await fetch(`${apiEndpoint}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.message || "Logout failed";
    throw new Error(message); // Throw an error if the response is not ok
  }

  return response.json();
};

export const useLogout = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const clearLinksStore = useLinkStore((store) => store.clearLinksStore);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      router.push("/login");

      toast.success("Logout successful!");
      clearUser();
      clearLinksStore();
      clearAuth();
      // setUser(null); // Clear the user state
      // Redirect to the login page
    },
    onError: (error) => {
      toast.error(error.message || "Logout failed");
    },
  });
};
