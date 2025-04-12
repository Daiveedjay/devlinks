import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLinkStore } from "@/store/useLinkStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { ApiError, ApiResponse } from "../auth/types/types";
import { apiEndpoint } from "@/lib/constants";
import { Link } from "@/store/useLinkStore";

const updateLink = async (
  id: number,
  link: Link
): Promise<ApiResponse<Link>> => {
  const response = await fetch(`${apiEndpoint}/links/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(link),
  });

  const data: ApiResponse<Link> = await response.json();

  if (!response.ok || data.error) {
    throw {
      status: response.status,
      message: data.message || "Error updating link",
    } as ApiError;
  }

  return data;
};

export const useUpdateLink = () => {
  const { links, setLinks } = useLinkStore((store) => store);
  const user = useUserStore((store) => store.user);
  const userId = user?.id;
  const queryClient = useQueryClient();
  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useMutation({
    mutationFn: (data: { id: number; link: Link }) =>
      updateLink(data.id, data.link),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = links ?? [];

      // Optimistically update the link.
      const optimisticLinks = previousLinks.map((link) =>
        link.ID === data.id ? { ...link, ...data.link } : link
      );
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
        error.message || "Failed to update the link. Please try again."
      );
    },

    onSuccess: (apiResponse, _, context) => {
      if (apiResponse.error) {
        toast.error(
          apiResponse.message || "An error occurred while updating the link."
        );
        if (context?.previousLinks) {
          setLinks(context.previousLinks);
        }
        return;
      }
      toast.success(apiResponse.message || "Link updated successfully!");
    },
  });
};
