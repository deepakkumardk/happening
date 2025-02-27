import { create } from "zustand";

export type ThemeStore = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const useIsDarkStore = create<ThemeStore>((set) => ({
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      return { isDark: !state.isDark };
    }),
}));

export type AuthStore = {
  isLoggedIn: boolean;
  toggleAuthState: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  toggleAuthState: () =>
    set((state) => {
      return { isLoggedIn: !state.isLoggedIn };
    }),
}));
