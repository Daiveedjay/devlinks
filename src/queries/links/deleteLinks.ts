import { ApiError, ApiResponse } from "../auth/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLinkStore } from "@/store/useLinkStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { apiEndpoint } from "@/lib/constants";

const deleteLink = async (id: number): Promise<ApiResponse> => {
  const response = await fetch(`${apiEndpoint}/links/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: ApiResponse = await response.json();

  if (!response.ok || data.error) {
    throw {
      status: response.status,
      message: data.message || "Error deleting link",
    } as ApiError;
  }

  return data;
};

export const useDeleteLink = () => {
  const { links, setLinks } = useLinkStore((store) => store);
  const user = useUserStore((store) => store.user);
  const userId = user?.id;
  const queryClient = useQueryClient();
  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useMutation({
    mutationFn: (id: number) => deleteLink(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previousLinks = links;
      const optimisticLinks =
        previousLinks?.filter((link) => link.ID !== id) ?? [];
      setLinks(optimisticLinks);

      return { previousLinks };
    },

    onError: (error: ApiError, __, context) => {
      if (error.status === 401) {
        setIsUnauthorized(true);
      }
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
      toast.error(
        error.message ||
          "An error occurred while deleting the link. Please try again."
      );
    },

    onSuccess: (apiResponse, id, context) => {
      if (apiResponse.error) {
        toast.error(
          apiResponse.message || "An error occurred. Please try again."
        );
        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }
        return;
      }
      toast.success(apiResponse.message || "Link deleted successfully!");
    },
  });
};
