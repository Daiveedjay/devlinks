import { create } from "zustand";

export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  user_image: string;
}

interface UserStore {
  user: User;
  updateUser: (updatedData: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
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
}));
