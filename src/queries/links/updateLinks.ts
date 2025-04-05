import { Link, useLinkStore } from "@/store/useLinkStore";

import { apiEndpoint } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { ApiResponse, isErrorResponse } from "../auth/signup";

// Update link function
const updateLink = async (id: number, link: Link): Promise<ApiResponse> => {
  const response = await fetch(`${apiEndpoint}/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("auth-token")}`,
    },
    body: JSON.stringify(link),
  });

  return response.json();
};

export const useUpdateLink = (userId: string) => {
  const { links, setLinks } = useLinkStore((store) => store);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; link: Link }) =>
      updateLink(data.id, data.link),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = links;

      // Optimistically modify the links
      const optimisticLinks = previousLinks.map((link) =>
        link.ID === data.id ? { ...link, ...data.link } : link
      );
      setLinks(optimisticLinks);
      return { previousLinks };
    },

    onError: (_, __, context) => {
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }

      // Show an error toast if mutation fails
      toast.error("Failed to update the link. Please try again.");
    },

    onSuccess: (apiResponse, _, context) => {
      if (isErrorResponse(apiResponse)) {
        // If there's an error in the response, show a toast with the error message
        toast.error(
          apiResponse.error || "An error occurred while updating the link."
        );

        // Revert the optimistic update if there was an error
        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }

        return; // Early return to prevent further processing if there's an error
      }

      // Show a success toast if the link is successfully updated
      toast.success("Link updated successfully!");
    },
  });
};
