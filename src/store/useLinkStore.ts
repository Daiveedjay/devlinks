import { create } from "zustand";
import { socialMediaSchema } from "@/lib/validation";

export interface Link {
  ID: number;
  Platform?: string;
  URL: string;
}

interface LinkStore {
  links: Link[];
  errors: Record<number, string | null>; // Changed to number keys
  addLink: () => void;
  updateLink: (id: number, updatedData: Partial<Link>) => void; // Changed to number
  removeLink: (id: number) => void; // Changed to number
  setLinks: (links: Link[]) => void; // Add this line

  // Preview state
  previewLinks: Link[];
  setPreviewLinks: (links: Link[]) => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
  previewLinks: [],
  links: [],
  errors: {},
  // Preview state

  addLink: () =>
    set((state) => {
      const newId =
        state.previewLinks?.length > 0
          ? Math.max(...state.previewLinks.map((link) => link.ID)) + 1
          : 1;
      return {
        links: [...state.links, { ID: newId, Platform: "", URL: "" }],
        errors: { ...state.errors, [newId]: null },
      };
    }),

  updateLink: (id, updatedData) =>
    set((state) => {
      const link = state.links.find((link) => link.ID === id);
      if (!link) return state;

      const newLinkData = { ...link, ...updatedData };

      const result = socialMediaSchema.safeParse(newLinkData);
      const newError = result.success
        ? null
        : result.error.format().URL?._errors[0] ?? null;

      return {
        links: state.links?.map((l) => (l.ID === id ? newLinkData : l)),
        errors: { ...state.errors, [id]: newError },
      };
    }),

  removeLink: (id) =>
    set((state) => {
      const newErrors = { ...state.errors };
      delete newErrors[id];
      return {
        links: state.links.filter((link) => link.ID !== id),
        errors: newErrors,
      };
    }),

  setLinks: (links) =>
    set(() => {
      // Initialize error state for all links
      const newErrors: Record<number, string | null> = {};
      links?.forEach((link) => {
        const result = socialMediaSchema.safeParse(link);
        newErrors[link.ID] = result.success
          ? null
          : result.error.format().URL?._errors[0] ?? null;
      });

      return {
        links,
        errors: newErrors,
      };
    }),

  // Preview state management
  setPreviewLinks: (previewLinks) => set({ previewLinks: previewLinks }),
}));
