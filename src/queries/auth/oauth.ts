// import { apiEndpoint } from "@/lib/constants";
// import { User, useUserStore } from "@/store/useUserStore";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { AuthResponse } from "./types/types";

// const googleOauth = async (): Promise<AuthResponse> => {
//   const response = await fetch(`${apiEndpoint}/auth/google`, {
//     method: "GET",
//     credentials: "include",
//   });

//   const data: AuthResponse = await response.json();

//   if (!response.ok || data.error) {
//     throw new Error(data.message || "Login failed");
//   }

//   return data;
// };

// export const useGoogleAuth = () => {
//   const setUser = useUserStore((store) => store.setUser);

//   return useMutation<AuthResponse, Error>({
//     mutationFn: googleOauth,
//     onError: (error) => toast.error(error.message),

//     onSuccess: (data) => {
//       toast.success("Login successful!");
//       setUser(data.data as User);
//     },
//   });
// };

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

// Utility to extract URL params
const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    token: urlParams.get("token"),
    email: urlParams.get("email"),
    username: urlParams.get("username"),
    id: urlParams.get("id"),
  };
};

export const useGoogleAuthCallback = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async () => {
      const { token, email, username, id } = getUrlParams();

      // Check if token and other params are available in the URL
      if (!token || !email || !username || !id) {
        return;
        // throw new Error("Authentication data missing from URL");
      }

      // Set the token in cookies
      Cookies.set("auth-token", token, { expires: 7, secure: true });

      // Store user data in Zustand
      setUser({
        email,
        username,
        id: id,
        bio: "", // Default empty bio
        user_image: "", // Default empty image URL
      });

      // Return success for now (you can handle further actions like navigating or fetching data)
      return Promise.resolve({ token, email, username, id });
    },
    onError: (error: any) => {
      // toast.error(error.message || "Failed to complete authentication");
      return;
    },
    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.username}!`);
      // Optional: Redirect the user to a dashboard or home page after successful login
      window.location.href = "/"; // Example redirect
    },
  });
};
