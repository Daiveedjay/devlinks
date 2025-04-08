import { create } from "zustand";
import { socialMediaSchema } from "@/lib/validation";
import { v4 as uuidv4 } from "uuid";

export interface Link {
  ID: number;
  Platform?: string;
  URL: string;
  // New property to differentiate new vs. existing links
  isNew?: boolean;
  // Flag to indicate unsaved modifications on existing links
  dirty?: boolean;
  // Store the original values for comparison
  original?: {
    Platform?: string;
    URL: string;
  };

  renderKey?: string; // Add renderKey to force re-render
}

interface LinkStore {
  links: Link[];
  errors: Record<number, string | null>;
  addLink: () => void;
  updateLink: (id: number, updatedData: Partial<Link>) => void;
  removeLink: (id: number) => void;
  setLinks: (links: Link[]) => void;
  // setPreviewLinks: (links: Link[]) => void;
  // For marking a link as saved (for both POST and PUT)
  markLinkAsSaved: (id: number) => void;

  cleanupEmptyLinks: () => void;

  clearLinksStore: () => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  errors: {},
  // If you need a separate preview state, you can keep it:
  // setPreviewLinks: (previewLinks) => set({ previewLinks }),

  addLink: () =>
    set((state) => {
      const generateRandomId = () => Math.floor(Math.random() * 1000000) + 1;

      // Keep generating until we find a unique ID
      let newId = generateRandomId();
      while (state.links.some((link) => link.ID === newId)) {
        newId = generateRandomId();
      }

      const newLink: Link = {
        ID: newId,
        Platform: "",
        URL: "",
        renderKey: uuidv4(),
        // Mark this link as new so we know it’s not saved yet.
        isNew: true,
        dirty: false,
        original: { Platform: "", URL: "" },
      };
      return {
        links: [...state.links, newLink],
        errors: { ...state.errors, [newId]: null },
      };
    }),

  updateLink: (id, updatedData) =>
    set((state) => {
      const link = state.links.find((link) => link.ID === id);
      if (!link) return state;

      const newLinkData = { ...link, ...updatedData };

      // For existing links (isNew is false or undefined), check if modified.
      // New links will always be saved in bulk so we don’t need an individual save button.
      const newDirty =
        !link.isNew &&
        (newLinkData.Platform !== link.original?.Platform ||
          newLinkData.URL !== link.original?.URL);

      // Validate the updated link data.
      const result = socialMediaSchema.safeParse(newLinkData);
      const newError = result.success
        ? null
        : result.error.format().URL?._errors[0] ?? null;

      return {
        links: state.links.map((l) =>
          l.ID === id ? { ...newLinkData, dirty: newDirty } : l
        ),
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
      const newErrors: Record<number, string | null> = {};
      // When setting links from backend, mark them as existing (not new) and not dirty.
      const normalizedLinks = links.map((link) => {
        const result = socialMediaSchema.safeParse(link);
        newErrors[link.ID] = result.success
          ? null
          : result.error.format().URL?._errors[0] ?? null;
        return {
          ...link,
          isNew: false,
          dirty: false,
          original: { Platform: link.Platform, URL: link.URL },
        };
      });
      return {
        links: normalizedLinks,
        errors: newErrors,
      };
    }),

  markLinkAsSaved: (id) =>
    set((state) => ({
      links: state.links.map((l) =>
        l.ID === id
          ? {
              ...l,
              // After a successful save, reset the flags.
              isNew: false,
              dirty: false,
              // Update original to the current values
              original: { Platform: l.Platform, URL: l.URL },
            }
          : l
      ),
    })),

  // Remove links that are new and haven't been filled in (both Platform and URL are empty)
  cleanupEmptyLinks: () => {
    set((state) => ({
      links: state.links.filter(
        (link) =>
          !link.isNew ||
          (link?.Platform?.trim() ?? "") !== "" ||
          (link?.URL?.trim() ?? "") !== ""
      ),
    }));
  },
  clearLinksStore: () => set(() => ({ links: [], errors: {} })),
}));
