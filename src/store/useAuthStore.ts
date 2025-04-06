import { create } from "zustand";

export interface AuthStore {
  isUnauthorized: boolean;
  setIsUnauthorized: (isUnauthorized: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isUnauthorized: false,
  setIsUnauthorized: (isUnauthorized: boolean) => set({ isUnauthorized }),
  clearAuth: () => set({ isUnauthorized: false }),
}));
