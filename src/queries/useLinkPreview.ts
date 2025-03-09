import { useQuery } from "@tanstack/react-query";

const fetchLinkPreview = async (url: string) => {
  if (!url) return null;

  const API_KEY = process.env.NEXT_PUBLIC_OPENGRAPH_API_KEY;
  const response = await fetch(
    `https://opengraph.io/api/1.1/site/${encodeURIComponent(
      url
    )}?app_id=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch preview");
  }

  const data = await response.json();
  return {
    title: data.hybridGraph?.title || "No title",
    description: data.hybridGraph?.description || "No description",
    image: data.hybridGraph?.image || "",
  };
};

export const useLinkPreview = (url: string) => {
  return useQuery({
    queryKey: ["linkPreview", url],
    queryFn: () => fetchLinkPreview(url),
    enabled: !!url, // Prevents running the query when no URL is provided
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
