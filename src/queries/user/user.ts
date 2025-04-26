import { apiEndpoint, TOAST_TIMEOUT } from "@/lib/constants";
import { User } from "@/store/useUserStore";
import { ApiError, ApiResponse } from "../auth/types/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<ApiResponse<Partial<User>>> => {
  const response = await fetch(`${apiEndpoint}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data: ApiResponse<Partial<User>> = await response.json();

  if (!response.ok || data.error) {
    throw {
      status: response.status,
      message: data.message || "Error updating user",
    } as ApiError;
  }

  return data;
};

export const useUpdateUser = () => {
  const { user, updateUser: updateUserLocal } = useUserStore((store) => store);
  const userId = user?.id;

  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useMutation<
    ApiResponse<Partial<User>>, // TData
    ApiError, // TError
    Partial<User>, // TVariables
    { prevUserData: typeof user } // TContext
  >({
    mutationFn: (userData: Partial<User>) => updateUser(userId, userData),

    onMutate: async (newUserData: Partial<User>) => {
      const prevUserData = user;

      updateUserLocal({
        ...prevUserData,
        ...newUserData,
      });

      return { prevUserData };
    },

    onSuccess: (apiResponse, variables, context) => {
      if (apiResponse.error) {
        if (context?.prevUserData) {
          updateUserLocal(context.prevUserData);
        }
        // toast.error(
        //   apiResponse.message || "User update failed. Please try again."
        // );
        toast(apiResponse.message || "User update failed. Please try again.", {
          className: "error-toast ",
          // description: "With a description and an icon",
          duration: TOAST_TIMEOUT,
          // icon: <ShieldAlert />,
        });
      } else {
        // toast.success(apiResponse.message || "User updated successfully!");
        toast(apiResponse.message || "User updated successfully!", {
          className: "success-toast",
          // description: "With a description and an icon",
          duration: TOAST_TIMEOUT,
          // icon: <CircleCheck />,
        });
      }
    },

    onError: (error, variables, context) => {
      if (error.status === 401) {
        setIsUnauthorized(true);
        return false;
      }
      if (context?.prevUserData) {
        updateUserLocal(context.prevUserData);
      }
      // toast.error(error.message);

      toast(error.message, {
        className: "error-toast ",
        // description: "With a description and an icon",
        duration: TOAST_TIMEOUT,
        // icon: <ShieldAlert />,
      });
    },
  });
};
