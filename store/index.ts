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
