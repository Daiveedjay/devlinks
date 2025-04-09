import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  user_image: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  updateUser: (updatedData: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        id: "",
        username: "",
        email: "",
        bio: "",
        user_image: "",
      },

      updateUser: (updatedData: Partial<User>) => {
        set((state) => ({
          user: { ...state.user, ...updatedData },
        }));
      },
      setUser: (user: User) => {
        set({ user });
      },
      clearUser: () => {
        set({
          user: {
            id: "",
            username: "",
            email: "",
            bio: "",
            user_image: "",
          },
        });
      },
    }),
    {
      name: "user-storage", // unique name for localStorage key
      // storage: createJSONStorage(() => localStorage), // (optional) by default, localStorage is used
      // partialize: (state) => ({ user: state.user }), // (optional) choose which part of the state to persist
    }
  )
);
