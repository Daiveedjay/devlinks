import { Link, useLinkStore } from "@/store/useLinkStore";

import { useQuery } from "@tanstack/react-query";
import { apiEndpoint } from "@/lib/constants";
import { ApiResponse } from "../auth/signup";
import { useAuthStore } from "@/store/useAuthStore";

export const fetchLinks = async (
  setLinks: (links: Link[]) => void
): Promise<ApiResponse> => {
  const response = await fetch(`${apiEndpoint}/links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // If the status is 401, throw an error.
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  // For other non-OK responses, you might also want to handle them:
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching links");
  }

  const data = await response.json();
  setLinks(data.data ?? []);
  return data;
};

export const useFetchLinks = (userId: string) => {
  const setLinks = useLinkStore((store) => store.setLinks);
  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useQuery({
    queryKey: ["links", userId],
    queryFn: () => fetchLinks(setLinks),
    enabled: !!userId,
    retry: (failureCount, error: Error) => {
      // Don't retry on 401 Unauthorized errors
      if (error.message === "Unauthorized") {
        console.log("Unauthorized error, not retrying:", error);
        setIsUnauthorized(true);
        return false;
      }
      // Retry other errors (optional, customize as needed)
      return failureCount < 0;
    },
  });
};
