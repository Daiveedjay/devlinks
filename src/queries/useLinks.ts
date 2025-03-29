import { Link, useLinkStore } from "@/store/useLinkStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ApiResponse {
  data: Link[];
  message: string;
}

const API_URL = "http://localhost:8080/links";

// A dedicated fetch function that fetches links, updates the store, and returns the data.
// export async function fetchLinksAPI(
//   setLinks: (links: Link[]) => void
// ): Promise<ApiResponse> {
//   const response = await fetch(API_URL);
//   const data: ApiResponse = await response.json();
//   setLinks(data.data);
//   return data;
// }

// export function useLinks() {
//   const queryClient = useQueryClient();
//   const setLinks = useLinkStore((store) => store.setLinks);

//   // Use the fetch function inside the query to load data initially.
//   const { data: links, isLoading } = useQuery<ApiResponse>({
//     queryKey: ["links"],
//     queryFn: () => fetchLinksAPI(setLinks),
//   });

//   // Helper to refresh data from the API once after a successful mutation.
//   const refreshLinks = async () => {
//     await fetchLinksAPI(setLinks);
//     // Optionally, update React Query’s cache if you depend on it elsewhere.
//     queryClient.setQueryData(
//       ["links"],
//       (oldData: ApiResponse | undefined) => oldData
//     );
//   };

//   // Mutation to add a new link
//   const addLink = useMutation<ApiResponse, Error, Link>({
//     mutationFn: async (newLink) => {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newLink),
//       });
//       return response.json();
//     },
//     onSuccess: async () => {
//       // Fetch fresh data after a successful add.
//       await refreshLinks();
//     },
//   });

//   // Mutation to update an existing link
//   const updateLink = useMutation<
//     ApiResponse,
//     Error,
//     Partial<Link> & { id: number }
//   >({
//     mutationFn: async ({ id, ...updates }) => {
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updates),
//       });
//       return response.json();
//     },
//     onSuccess: async () => {
//       // Fetch fresh data after a successful update.
//       await refreshLinks();
//     },
//   });

//   // Mutation to delete a link
//   const deleteLink = useMutation<ApiResponse, Error, number>({
//     mutationFn: async (id) => {
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//       });
//       return response.json();
//     },
//     onSuccess: async () => {
//       // Fetch fresh data after a successful deletion.
//       await refreshLinks();
//     },
//   });

//   return {
//     links: links?.data ?? [],
//     isLoading,
//     addLink: addLink.mutate,
//     updateLink: updateLink.mutate,
//     deleteLink: deleteLink.mutate,
//     isAdding: addLink.isPending,
//     isUpdating: updateLink.isPending,
//     isDeleting: deleteLink.isPending,
//     fetchLinksAPI,
//   };
// }

// TODO
export const fetchLinks = async (
  setLinks: (links: Link[]) => void
): Promise<ApiResponse> => {
  const response = await fetch(API_URL);
  const data: ApiResponse = await response.json();
  console.log("Data", data);
  setLinks(data.data ?? []);
  return data;
};

export const useFetchLinks = (userId: string) => {
  const setLinks = useLinkStore((store) => store.setLinks);

  return useQuery({
    queryKey: ["links", userId],
    queryFn: () => fetchLinks(setLinks), // Pass the setter directly to the fetch function
    enabled: !!userId, // Ensures the query only runs if userId is defined
    staleTime: 1000 * 60 * 30, // 30 mins
  });
};

// Add link function
const addLink = async (newLinks: Link | Link[]): Promise<ApiResponse> => {
  const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(linksToAdd),
  });
  const data: ApiResponse = await response.json();
  return data;
};

export const useAddLink = (userId: string) => {
  const { setLinks, links, markLinkAsSaved } = useLinkStore((store) => store);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLinks: Link | Link[]) => addLink(newLinks),

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
    },
    onSuccess: (apiResponse, newLinks) => {
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

// Update link function
const updateLink = async (id: number, link: Link): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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
    },
  });
};

// Delete link function
const deleteLink = async (id: number): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
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
  });
};
