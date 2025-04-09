import { apiEndpoint } from "@/lib/constants";
import { User, useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<{ status: number; data: Partial<User> }> => {
  const response = await fetch(`${apiEndpoint}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  // If it's not a 200, throw an error so that onError will be triggered.
  if (response.status !== 200) {
    throw new Error(data.message);
  }

  // Alternatively, if you don’t want to throw here, you could return the response including the status.
  // and then perform an extra check in onSuccess to decide if you need to rollback.
  return { status: response.status, data };
};

export const useUpdateUser = () => {
  const { user, updateUser: updateUserLocal } = useUserStore((store) => store);

  const userId = user?.id;

  return useMutation<
    { status: number; data: Partial<User> }, // TData
    Error, // TError
    Partial<User>, // TVariables
    { prevUserData: typeof user } // TContext
  >({
    mutationFn: (userData: Partial<User>) => updateUser(userId, userData),

    onMutate: async (newUserData: Partial<User>) => {
      // Save the current state to rollback if necessary.
      const prevUserData = user;

      // Optimistically update the user data in local state.
      updateUserLocal({
        ...prevUserData,
        username: newUserData.username,
        bio: newUserData.bio,
      });

      return { prevUserData };
    },

    onSuccess: (result, variables, context) => {
      // Extra check: if the backend didn't return a 200, rollback
      if (result.status !== 200) {
        if (context?.prevUserData) {
          updateUserLocal(context.prevUserData);
        }
        toast.error("User update failed. Please try again.");
      } else {
        toast.success("User updated successfully!");
      }
    },

    onError: (error, variables, context) => {
      // Rollback the optimistic update if available.
      if (context?.prevUserData) {
        updateUserLocal(context.prevUserData);
      }
      toast.error(error.message);
      console.error("Error updating user:", error);
    },
  });
};
