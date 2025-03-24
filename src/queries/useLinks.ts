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
  setPreviewLinks: (links: Link[]) => void
): Promise<ApiResponse> => {
  const response = await fetch(API_URL);
  const data: ApiResponse = await response.json();
  console.log("Data", data);
  setPreviewLinks(data.data ?? []);
  return data;
};

export const useFetchLinks = (userId: string) => {
  const setPreviewLinks = useLinkStore((store) => store.setPreviewLinks);

  return useQuery({
    queryKey: ["links", userId],
    queryFn: () => fetchLinks(setPreviewLinks), // Pass the setter directly to the fetch function
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
  const { setPreviewLinks, previewLinks, setLinks } = useLinkStore(
    (store) => store
  );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLinks: Link | Link[]) => addLink(newLinks),

    onMutate: async (newLinks) => {
      // Cancel the existing query to prevent it from updating the cache with the new data
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = previewLinks;

      // Handle both single and multiple links
      const linksToAdd = Array.isArray(newLinks) ? newLinks : [newLinks];
      setPreviewLinks([...previousLinks, ...linksToAdd]);
      // Clear the links state to prevent duplicates
      setLinks([]);

      return { previousLinks };
    },

    onError: (_, __, context) => {
      // On error, rollback to the previous state
      if (context?.previousLinks) {
        setPreviewLinks(context.previousLinks);
      }
    },
  });
};

// Update link function
interface UpdatePayload {
  id: number;
  updates: Partial<Link>;
}

const updateLink = async (
  updates: UpdatePayload | UpdatePayload[]
): Promise<ApiResponse> => {
  const isMultiple = Array.isArray(updates);

  if (isMultiple) {
    // Handle multiple updates
    const response = await fetch(`${API_URL}/batch`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    return response.json();
  } else {
    // Handle single update
    const { id, updates: linkUpdates } = updates as UpdatePayload;
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(linkUpdates),
    });
    return response.json();
  }
};

export const useUpdateLink = (userId: string) => {
  const { setLinks, links } = useLinkStore((store) => store);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdatePayload | UpdatePayload[]) =>
      updateLink(updates),

    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = links;

      // Handle both single and multiple updates
      const updatesToApply = Array.isArray(updates) ? updates : [updates];
      const optimisticLinks = [...links];

      // Apply all updates optimistically
      updatesToApply.forEach(({ id, updates: linkUpdates }) => {
        const index = optimisticLinks.findIndex((link) => link.ID === id);
        if (index !== -1) {
          optimisticLinks[index] = {
            ...optimisticLinks[index],
            ...linkUpdates,
          };
        }
      });

      setLinks(optimisticLinks);
      return { previousLinks };
    },

    onError: (_, __, context) => {
      if (context?.previousLinks) {
        setLinks(context.previousLinks);
      }
    },

    onSuccess: (data, variables) => {
      const updatesToApply = Array.isArray(variables) ? variables : [variables];

      // Create map of updated IDs to their new data
      const updatedMap = new Map(
        data.data.map((updated, i) => [updatesToApply[i].id, updated])
      );

      // Update links with server response data
      const updatedLinks = links.map((link) =>
        updatedMap.has(link.ID) ? updatedMap.get(link.ID)! : link
      );

      setLinks(updatedLinks);
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
  const { previewLinks, setPreviewLinks } = useLinkStore((store) => store);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteLink(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });
      const previousLinks = previewLinks;

      // Optimistically remove the link
      const optimisticLinks = previousLinks.filter((link) => link.ID !== id);

      setPreviewLinks(optimisticLinks);
      return { previousLinks };
    },

    onError: (_, __, context) => {
      if (context?.previousLinks) {
        setPreviewLinks(context.previousLinks);
      }
    },
  });
};
