import { create } from "zustand";
import { socialMediaSchema } from "@/lib/validation"; // Import your validation schema

export interface Link {
  id: string;
  platform?: string;
  url: string;
}

interface LinkStore {
  links: Link[];
  errors: Record<string, string | null>; // Store errors by link ID
  addLink: () => void;
  updateLink: (id: string, updatedData: Partial<Link>) => void;
  removeLink: (id: string) => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  errors: {}, // Initialize errors as an empty object

  addLink: () =>
    set((state) => {
      const newId = crypto.randomUUID();
      return {
        links: [...state.links, { id: newId, platform: "", url: "" }],
        errors: { ...state.errors, [newId]: null }, // Initialize error state for new link
      };
    }),

  updateLink: (id, updatedData) =>
    set((state) => {
      // Find the link being updated
      const link = state.links.find((link) => link.id === id);
      if (!link) return state;

      // Merge updates with existing link data
      const newLinkData = { ...link, ...updatedData };

      // Validate the updated link
      const result = socialMediaSchema.safeParse(newLinkData);
      const newError = result.success
        ? null
        : result.error.format().url?._errors[0] ?? null;

      return {
        links: state.links.map((l) => (l.id === id ? newLinkData : l)),
        errors: { ...state.errors, [id]: newError }, // Store errors globally
      };
    }),

  removeLink: (id) =>
    set((state) => {
      const newErrors = { ...state.errors };
      delete newErrors[id]; // Remove error when deleting a link
      return {
        links: state.links.filter((link) => link.id !== id),
        errors: newErrors,
      };
    }),
}));
