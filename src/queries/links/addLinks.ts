import { Link, useLinkStore } from "@/store/useLinkStore";
import { apiEndpoint } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, isErrorResponse } from "../auth/signup";
import { useAuthStore } from "@/store/useAuthStore";

// Optionally define a custom error type for clarity.
export interface ApiError {
  status: number;
  message: string;
}

const addLinks = async (newLinks: Link | Link[]): Promise<ApiResponse> => {
  const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];

  const response = await fetch(`${apiEndpoint}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(linksToAdd),
  });

  // Check for 401 and throw a custom error object.
  if (response.status === 401) {
    throw {
      status: 401,
      message: "Unauthorized",
    } as ApiError;
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message || "Error adding link",
    } as ApiError;
  }

  return response.json();
};

export const useAddLink = (userId: string) => {
  const { setLinks, links, markLinkAsSaved } = useLinkStore((store) => store);
  const queryClient = useQueryClient();
  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useMutation({
    mutationFn: (newLinks: Link | Link[]) => addLinks(newLinks),

    onMutate: async (newLinks) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = links;
      const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];
      setLinks([...previousLinks, ...linksToAdd]);
      return { previousLinks };
    },

    onError: (error: unknown, __, context) => {
      // Check if error is our custom ApiError with a 401 status.
      if (typeof error === "object" && error !== null && "status" in error) {
        const err = error as ApiError;
        if (err.status === 401) {
          setIsUnauthorized(true);
        }
      }
      // Rollback to the previous state if available.
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
      toast.error("An error occurred while adding the link. Please try again.");
    },

    onSuccess: (apiResponse, newLinks, context) => {
      if (isErrorResponse(apiResponse)) {
        toast.error(apiResponse.error);
        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }
        return;
      }
      const linksToReplace = Array.isArray(newLinks) ? newLinks : [newLinks];
      const idsToReplace = new Set(linksToReplace.map((link) => link.ID));
      const filtered = links.filter((link) => !idsToReplace.has(link.ID));
      const newLinksFromApi = apiResponse.data;
      setLinks([...filtered, ...newLinksFromApi]);
      newLinksFromApi.forEach((link) => {
        markLinkAsSaved(link.ID);
      });
    },
  });
};
