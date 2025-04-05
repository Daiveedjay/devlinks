import { apiEndpoint } from "@/lib/constants";

import { useLinkStore } from "@/store/useLinkStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { ApiResponse } from "../auth/signup";

const deleteLink = async (id: number): Promise<ApiResponse> => {
  const response = await fetch(`${apiEndpoint}/links/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("auth-token")}`,
    },
  });
  return response.json();
};

export const useDeleteLink = (userId: string) => {
  const { links, setLinks } = useLinkStore((store) => store);
  const queryClient = useQueryClient();

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

    onError: (_, __, context) => {
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
    },
    onSuccess: (apiResponse, id, context) => {
      // Check if the response contains an error
      if (apiResponse.error || !apiResponse.data) {
        // If there was an error in the response, revert to the previous state
        toast.error(
          apiResponse.error || "An error occurred. Please try again."
        );

        // Revert the optimistic update if there was an error
        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }

        return; // Early return to prevent further processing if there's an error
      }

      // Show a success toast if the deletion was successful
      toast.success("Link deleted successfully!");
    },
  });
};
