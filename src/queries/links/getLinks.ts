import { apiEndpoint } from "@/lib/constants";
import { Link } from "@/store/useLinkStore";

import { useQuery } from "@tanstack/react-query";
import { useLinkStore } from "@/store/useLinkStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { ApiError, ApiResponse } from "../auth/types/types";

export const fetchLinks = async (): Promise<Link[]> => {
  const response = await fetch(`${apiEndpoint}/links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: ApiResponse<Link[]> = await response.json();

  if (!response.ok || data.error) {
    throw {
      status: response.status,
      message: data.message || "Error fetching links",
    } as ApiError;
  }

  return data.data ?? [];
};

export const useFetchLinks = () => {
  const user = useUserStore((store) => store.user);
  const userId = user?.id;
  const setLinks = useLinkStore((store) => store.setLinks);
  const setIsUnauthorized = useAuthStore((store) => store.setIsUnauthorized);

  return useQuery({
    queryKey: ["links", userId],
    queryFn: async () => {
      const links = await fetchLinks();
      setLinks(links);
      return links;
    },
    enabled: userId !== undefined, // Ensure the query only runs when the user is available
    retry: (failureCount, error: ApiError) => {
      if (error.status === 401) {
        setIsUnauthorized(true);
        return false;
      }
      return failureCount < 3;
    },
  });
};
