// import { create } from "zustand";
// import { socialMediaSchema } from "@/lib/validation";

// export interface Link {
//   ID: number;
//   Platform?: string;
//   URL: string;
// }

// interface LinkStore {
//   links: Link[];
//   errors: Record<number, string | null>; // Changed to number keys
//   addLink: () => void;
//   updateLink: (id: number, updatedData: Partial<Link>) => void; // Changed to number
//   removeLink: (id: number) => void; // Changed to number
//   setLinks: (links: Link[]) => void; // Add this line

//   // Preview state
//   previewLinks: Link[];
//   setPreviewLinks: (links: Link[]) => void;
// }

// export const useLinkStore = create<LinkStore>((set) => ({
//   previewLinks: [],
//   links: [],
//   errors: {},
//   // Preview state

//   addLink: () =>
//     set((state) => {
//       const newId =
//         state.previewLinks?.length > 0
//           ? Math.max(...state.previewLinks.map((link) => link.ID)) + 1
//           : 1;
//       return {
//         links: [...state.links, { ID: newId, Platform: "", URL: "" }],
//         errors: { ...state.errors, [newId]: null },
//       };
//     }),

//   updateLink: (id, updatedData) =>
//     set((state) => {
//       const link = state.links.find((link) => link.ID === id);
//       if (!link) return state;

//       const newLinkData = { ...link, ...updatedData };

//       const result = socialMediaSchema.safeParse(newLinkData);
//       const newError = result.success
//         ? null
//         : result.error.format().URL?._errors[0] ?? null;

//       return {
//         links: state.links?.map((l) => (l.ID === id ? newLinkData : l)),
//         errors: { ...state.errors, [id]: newError },
//       };
//     }),

//   removeLink: (id) =>
//     set((state) => {
//       const newErrors = { ...state.errors };
//       delete newErrors[id];
//       return {
//         links: state.links.filter((link) => link.ID !== id),
//         errors: newErrors,
//       };
//     }),

//   setLinks: (links) =>
//     set(() => {
//       // Initialize error state for all links
//       const newErrors: Record<number, string | null> = {};
//       links?.forEach((link) => {
//         const result = socialMediaSchema.safeParse(link);
//         newErrors[link.ID] = result.success
//           ? null
//           : result.error.format().URL?._errors[0] ?? null;
//       });

//       return {
//         links,
//         errors: newErrors,
//       };
//     }),

//   // Preview state management
//   setPreviewLinks: (previewLinks) => set({ previewLinks: previewLinks }),
// }));

/////////////////////////// TODO
// import { create } from "zustand";
// import { socialMediaSchema } from "@/lib/validation";

// export interface Link {
//   ID: number;
//   Platform?: string;
//   URL: string;
//   dirty?: boolean; // Indicates unsaved changes
//   // Optionally, store the original values to compare later
//   original?: {
//     Platform?: string;
//     URL: string;
//   };
// }

// interface LinkStore {
//   links: Link[];
//   errors: Record<number, string | null>;
//   addLink: () => void;
//   updateLink: (id: number, updatedData: Partial<Link>) => void;
//   removeLink: (id: number) => void;
//   setLinks: (links: Link[]) => void;
//   // You can keep your previewLinks if you really need a separate display state
//   previewLinks: Link[];
//   setPreviewLinks: (links: Link[]) => void;
//   // Optionally, add a method to mark a link as saved after a PUT request
//   markLinkAsSaved: (id: number) => void;
// }

// export const useLinkStore = create<LinkStore>((set) => ({
//   links: [],
//   previewLinks: [],
//   errors: {},

//   addLink: () =>
//     set((state) => {
//       const newId =
//         state.links.length > 0
//           ? Math.max(...state.links.map((link) => link.ID)) + 1
//           : 1;
//       const newLink: Link = {
//         ID: newId,
//         Platform: "",
//         URL: "",
//         dirty: false,
//         original: { Platform: "", URL: "" },
//       };
//       return {
//         links: [...state.links, newLink],
//         errors: { ...state.errors, [newId]: null },
//       };
//     }),

//   updateLink: (id, updatedData) =>
//     set((state) => {
//       const link = state.links.find((link) => link.ID === id);
//       if (!link) return state;

//       // Merge updated data into the current link
//       const newLinkData = { ...link, ...updatedData };

//       // Determine if the link is dirty by comparing against original values
//       const newDirty =
//         newLinkData.Platform !== link.original?.Platform ||
//         newLinkData.URL !== link.original?.URL;

//       // Run validation
//       const result = socialMediaSchema.safeParse(newLinkData);
//       const newError = result.success
//         ? null
//         : result.error.format().URL?._errors[0] ?? null;

//       return {
//         links: state.links.map((l) =>
//           l.ID === id ? { ...newLinkData, dirty: newDirty } : l
//         ),
//         errors: { ...state.errors, [id]: newError },
//       };
//     }),

//   removeLink: (id) =>
//     set((state) => {
//       const newErrors = { ...state.errors };
//       delete newErrors[id];
//       return {
//         links: state.links.filter((link) => link.ID !== id),
//         errors: newErrors,
//       };
//     }),

//   setLinks: (links) =>
//     set(() => {
//       // Initialize error state for all links and ensure they aren’t dirty
//       const newErrors: Record<number, string | null> = {};
//       const normalizedLinks = links.map((link) => {
//         const result = socialMediaSchema.safeParse(link);
//         newErrors[link.ID] = result.success
//           ? null
//           : result.error.format().URL?._errors[0] ?? null;
//         // Set original values when first loaded
//         return {
//           ...link,
//           dirty: false,
//           original: { Platform: link.Platform, URL: link.URL },
//         };
//       });
//       return {
//         links: normalizedLinks,
//         errors: newErrors,
//       };
//     }),

//   setPreviewLinks: (previewLinks) => set({ previewLinks }),

//   markLinkAsSaved: (id) =>
//     set((state) => ({
//       links: state.links.map((l) =>
//         l.ID === id
//           ? {
//               ...l,
//               dirty: false,
//               // Update original to the current value after a successful save
//               original: { Platform: l.Platform, URL: l.URL },
//             }
//           : l
//       ),
//     })),
// }));

import { create } from "zustand";
import { socialMediaSchema } from "@/lib/validation";

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
}

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  errors: {},
  // If you need a separate preview state, you can keep it:
  // setPreviewLinks: (previewLinks) => set({ previewLinks }),

  addLink: () =>
    set((state) => {
      const newId =
        state.links.length > 0
          ? Math.max(...state.links.map((link) => link.ID)) + 1
          : 1;
      const newLink: Link = {
        ID: newId,
        Platform: "",
        URL: "",
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
}));
