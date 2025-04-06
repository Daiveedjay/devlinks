import { Link, useLinkStore } from "@/store/useLinkStore";
import { apiEndpoint } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, isErrorResponse } from "../auth/signup";
import { useAuthStore } from "@/store/useAuthStore";

// Define a custom error type for API errors.
export interface ApiError {
  status: number;
  message: string;
}

const updateLink = async (id: number, link: Link): Promise<ApiResponse> => {
  const response = await fetch(`${apiEndpoint}/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(link),
  });

  if (response.status === 401) {
    throw { status: 401, message: "Unauthorized" } as ApiError;
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message || "Error updating link",
    } as ApiError;
  }

  return response.json();
};

export const useUpdateLink = (userId: string) => {
  const { links, setLinks } = useLinkStore((store) => store);
  const queryClient = useQueryClient();
  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useMutation({
    mutationFn: (data: { id: number; link: Link }) =>
      updateLink(data.id, data.link),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = links;

      // Optimistically update the link.
      const optimisticLinks = previousLinks.map((link) =>
        link.ID === data.id ? { ...link, ...data.link } : link
      );
      setLinks(optimisticLinks);
      return { previousLinks };
    },

    onError: (error: unknown, __, context) => {
      // Check if error is our custom ApiError and handle 401.
      if (typeof error === "object" && error !== null && "status" in error) {
        const err = error as ApiError;
        if (err.status === 401) {
          setIsUnauthorized(true);
        }
      }
      // Rollback the optimistic update.
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
      toast.error("Failed to update the link. Please try again.");
    },

    onSuccess: (apiResponse, _, context) => {
      if (isErrorResponse(apiResponse)) {
        toast.error(
          apiResponse.error || "An error occurred while updating the link."
        );
        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }
        return;
      }
      toast.success("Link updated successfully!");
    },
  });
};
