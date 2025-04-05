import { Link, useLinkStore } from "@/store/useLinkStore";

import { apiEndpoint } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { ApiResponse, isErrorResponse } from "../auth/signup";

const addLinks = async (newLinks: Link | Link[]): Promise<ApiResponse> => {
  const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];

  const response = await fetch(`${apiEndpoint}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("auth-token")}`,
    },

    body: JSON.stringify(linksToAdd),
  });
  return response.json();
};

export const useAddLink = (userId: string) => {
  const { setLinks, links, markLinkAsSaved } = useLinkStore((store) => store);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLinks: Link | Link[]) => addLinks(newLinks),

    onMutate: async (newLinks) => {
      // Cancel the existing query to prevent it from updating the cache with the new data
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = links;

      // Handle both single and multiple links
      const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];
      setLinks([...previousLinks, ...linksToAdd]);

      return { previousLinks };
    },

    onError: (_, __, context) => {
      // On error, rollback to the previous state
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
      toast.error("An error occurred while adding the link. Please try again.");
    },
    onSuccess: (apiResponse, newLinks, context) => {
      if (isErrorResponse(apiResponse)) {
        // If there's an error, show a toast with the error message
        toast.error(apiResponse.error);

        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }
        return; // Early return to prevent further processing if there's an error
      }
      // Normalize newLinks to an array.
      const linksToReplace = Array.isArray(newLinks) ? newLinks : [newLinks];

      const idsToReplace = new Set(linksToReplace.map((link) => link.ID));

      // Filter out the local optimistic links.
      const filtered = links.filter((link) => !idsToReplace.has(link.ID));

      // Assume that apiResponse.data contains the newly added links from the backend.
      const newLinksFromApi = apiResponse.data;

      // Replace the local links with the ones from the API.
      setLinks([...filtered, ...newLinksFromApi]);

      // For each new link from the API, update its flags so the UI knows it's saved.
      newLinksFromApi.forEach((link) => {
        markLinkAsSaved(link.ID);
      });
    },
  });
};
