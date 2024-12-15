import { create } from "zustand";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  isOAuth: boolean;
};

type AuthStore = {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string | null, user: User | null) => void;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  setAccessToken: (token, user) =>
    set({ accessToken: token, user, isAuthenticated: !!token }),
  setUser: (user) => set({ user }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
}));
