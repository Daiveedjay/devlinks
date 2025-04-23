import { socialMediaSchema } from "@/lib/validation";
import { create } from "zustand";

export interface Link {
  ID: number;
  Platform?: string;
  URL: string;
  UserID?: number;
  order: number; // Use lowercase consistently
  isNew?: boolean;
  dirty?: boolean;
  original?: {
    Platform?: string;
    URL: string;
    order?: number; // Use lowercase consistently
  };
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

  hasUnsavedChanges: () => boolean;

  revertUnsavedChanges: () => void;
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

        // Mark this link as new so we know it’s not saved yet.
        isNew: true,
        dirty: false,
        original: { Platform: "", URL: "" },
        order: state.links.length + 1, // Set the order based on the current length of links
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
    set((state) => {
      const newErrors: Record<number, string | null> = {};
      const normalizedLinks = links.map((link) => {
        const existingLink = state.links.find((l) => l.ID === link.ID);
        const result = socialMediaSchema.safeParse(link);
        newErrors[link.ID] = result.success
          ? null
          : result.error.format().URL?._errors[0] ?? null;
        return {
          ...link,
          order: link.order ?? 0,
          isNew: existingLink?.isNew ?? false,
          dirty: link.dirty ?? existingLink?.dirty ?? false,
          original: existingLink?.original ?? {
            Platform: link.Platform,
            URL: link.URL,
            order: link.order ?? 0,
          },
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
              isNew: false,
              dirty: false,
              original: {
                Platform: l.Platform,
                URL: l.URL,
                order: l.order, // Store the new order
              },
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

  revertUnsavedChanges: () =>
    set((state) => {
      // First, handle empty new links
      const cleanedLinks = state.links.filter(
        (link) =>
          !link.isNew ||
          (link?.Platform?.trim() ?? "") !== "" ||
          (link?.URL?.trim() ?? "") !== ""
      );

      // Then, revert orders to original state for links with unsaved order changes
      const revertedLinks = cleanedLinks.map((link) => ({
        ...link,
        order: link.original?.order ?? link.order,
        dirty: false,
      }));

      // Sort links by their original order
      const sortedLinks = revertedLinks.sort(
        (a, b) =>
          (a.original?.order ?? a.order) - (b.original?.order ?? b.order)
      );

      return {
        links: sortedLinks,
        errors: {},
      };
    }),

  hasUnsavedChanges: (): boolean => {
    const state = useLinkStore.getState();
    return state.links.some(
      (link) =>
        link.isNew ||
        link.Platform === "" ||
        link.URL === "" ||
        link.dirty ||
        link.order !== link.original?.order // Check for order changes
    );
  },
  clearLinksStore: () => set(() => ({ links: [], errors: {} })),
}));
