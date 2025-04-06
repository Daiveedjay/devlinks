import { apiEndpoint } from "@/lib/constants";
import { useLinkStore } from "@/store/useLinkStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

export type DeleteLinkResponse =
  | { message: string; error?: undefined }
  | { error: string; message?: undefined };

export interface ApiError {
  status: number;
  message: string;
}

const deleteLink = async (id: number): Promise<DeleteLinkResponse> => {
  const response = await fetch(`${apiEndpoint}/links/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (response.status === 401) {
    // Throw a custom error with a status so we can check it later
    throw { status: 401, message: "Unauthorized" } as ApiError;
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message || "Error deleting link",
    } as ApiError;
  }

  return response.json();
};

export const useDeleteLink = (userId: string) => {
  const { links, setLinks } = useLinkStore((store) => store);
  const queryClient = useQueryClient();
  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useMutation({
    mutationFn: (id: number) => deleteLink(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = links;
      // Optimistically remove the link
      const optimisticLinks = previousLinks.filter((link) => link.ID !== id);
      setLinks(optimisticLinks);
      return { previousLinks };
    },

    onError: (error: unknown, __, context) => {
      // If the error is our custom ApiError, check its status
      if (typeof error === "object" && error !== null && "status" in error) {
        const err = error as ApiError;
        if (err.status === 401) {
          setIsUnauthorized(true);
        }
      }
      // Rollback to previous links if available
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
      toast.error(
        "An error occurred while deleting the link. Please try again."
      );
    },

    onSuccess: (apiResponse, id, context) => {
      // Check if the response contains an error property
      if ("error" in apiResponse && apiResponse.error) {
        toast.error(
          apiResponse.error || "An error occurred. Please try again."
        );
        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }
        return;
      }
      toast.success("Link deleted successfully!");
    },
  });
};
