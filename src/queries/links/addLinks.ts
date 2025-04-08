import { apiEndpoint } from "@/lib/constants";
import { Link, useLinkStore } from "@/store/useLinkStore";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, isErrorResponse } from "../auth/signup";

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

export const useAddLink = () => {
  const { setLinks, links, markLinkAsSaved } = useLinkStore((store) => store);
  const user = useUserStore((store) => store.user);
  const userId = user?.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLinks: Link | Link[]) => addLinks(newLinks),

    onMutate: async (newLinks) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previousLinks = links;
      const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];

      // Filter out any existing links with the same temporary IDs
      const existingLinks = links.filter(
        (link) => !linksToAdd.some((newLink) => newLink.ID === link.ID)
      );

      // Combine existing links with new ones
      setLinks([...existingLinks, ...linksToAdd]);

      return { previousLinks };
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

      // Keep only links that weren't part of this update
      const existingLinks = links.filter(
        (link) => !linksToReplace.some((newLink) => newLink.ID === link.ID)
      );

      // Add the new links from the API response
      setLinks([...existingLinks, ...apiResponse.data]);

      // Mark new links as saved
      apiResponse.data.forEach((link) => {
        markLinkAsSaved(link.ID);
      });
    },
  });
};
