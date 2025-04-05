import { Link, useLinkStore } from "@/store/useLinkStore";

import { useQuery } from "@tanstack/react-query";
import { apiEndpoint } from "@/lib/constants";
import { ApiResponse } from "../auth/signup";

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
  const data: ApiResponse = await response.json();
  setLinks(data.data ?? []);
  return data;
};

export const useFetchLinks = (userId: string) => {
  const setLinks = useLinkStore((store) => store.setLinks);

  return useQuery({
    queryKey: ["links", userId],
    queryFn: () => fetchLinks(setLinks), // Pass the setter directly to the fetch function
    enabled: !!userId, // Ensures the query only runs if userId is defined
    // staleTime: 1000 * 60 * 30, // 30 mins
  });
};
