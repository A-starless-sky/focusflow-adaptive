import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BackgroundStore {
  currentBackground: string | null;
  setBackground: (background: string | null) => void;
}

export const useBackgroundStore = create<BackgroundStore>()(
  persist(
    (set) => ({
      currentBackground: null,
      setBackground: (background) => set({ currentBackground: background }),
    }),
    {
      name: "minrva-background",
    }
  )
);
