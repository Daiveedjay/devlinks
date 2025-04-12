import { apiEndpoint } from "@/lib/constants";
import { Link } from "@/store/useLinkStore";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLinkStore } from "@/store/useLinkStore";
import { useUserStore } from "@/store/useUserStore";
import { ApiResponse } from "../auth/types/types";
import { ApiError } from "@/queries/auth/types/types";

export const addLinks = async (
  newLinks: Link | Link[]
): Promise<ApiResponse<Link[]>> => {
  const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];

  const response = await fetch(`${apiEndpoint}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(linksToAdd),
  });

  const data: ApiResponse<Link[]> = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.message || "Error adding link");
  }

  return data;
};

export const useAddLink = () => {
  const { setLinks, links, markLinkAsSaved } = useLinkStore((store) => store);
  const user = useUserStore((store) => store.user);
  const userId = user?.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLinks: Link | Link[]) => addLinks(newLinks),

    onMutate: async (newLinks) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previousLinks = links;
      const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];

      const existingLinks = links.filter(
        (link) => !linksToAdd.some((newLink) => newLink.ID === link.ID)
      );

      setLinks([...existingLinks, ...linksToAdd]);

      return { previousLinks };
    },

    onSuccess: (apiResponse, newLinks) => {
      const linksToReplace = Array.isArray(newLinks) ? newLinks : [newLinks];

      // Filter out the optimistic links that are being replaced
      const existingLinks = (links ?? []).filter(
        (link) => !linksToReplace.some((newLink) => newLink.ID === link.ID)
      );

      // Combine existing links with the confirmed links from the server
      setLinks([...(existingLinks ?? []), ...(apiResponse.data ?? [])]);

      // Mark new links as saved
      apiResponse.data?.forEach((link) => {
        markLinkAsSaved(link.ID);
      });

      toast.success(apiResponse.message || "Links added successfully!");
    },

    onError: (error: ApiError, _newLinks, context) => {
      toast.error(error.message);
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
    },
  });
};
