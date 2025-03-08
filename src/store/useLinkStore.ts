import { create } from "zustand";

export interface Link {
  id: string;
  platform?: string;
  url: string;
}

interface LinkStore {
  links: Link[];
  addLink: () => void;
  // Partial<Link> allows us to update only the fields we want
  updateLink: (id: string, updatedData: Partial<Link>) => void;
  removeLink: (id: string) => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],

  addLink: () =>
    set((state) => ({
      links: [
        ...state.links,
        { id: crypto.randomUUID(), platform: "", url: "" }, // Unique ID for each link
      ],
    })),

  updateLink: (id, updatedData) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updatedData } : link
      ),
    })),

  removeLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),
}));
