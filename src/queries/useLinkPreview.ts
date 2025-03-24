import { useQuery } from "@tanstack/react-query";

interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
}

const fetchPreview = async (url: string): Promise<LinkPreviewData> => {
  const res = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("Failed to fetch preview");
  return res.json();
};

export function useLinkPreview(url: string) {
  return useQuery({
    queryKey: ["linkPreview", url],
    queryFn: () => fetchPreview(url),
    enabled: !!url, // Only fetch if URL exists
    retry: false,
    staleTime: Infinity, // Data never becomes stale, preventing refetch
  });
}
