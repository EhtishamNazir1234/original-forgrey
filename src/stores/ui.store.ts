import { create } from "zustand";

/**
 * Global client UI state (STATE ONLY). Drives the splash screen gate, global
 * loading overlay, sidebar, etc. Logic lives in hooks.
 */
interface UIState {
  appReady: boolean; // splash-screen gate
  globalLoading: boolean; // app-level blocking loader
  sidebarOpen: boolean;
  setAppReady: (ready: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  toggleSidebar: (open?: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  appReady: false,
  globalLoading: false,
  sidebarOpen: false,
  setAppReady: (appReady) => set({ appReady }),
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
  toggleSidebar: (open) =>
    set((s) => ({ sidebarOpen: open ?? !s.sidebarOpen })),
}));

export const selectAppReady = (s: UIState) => s.appReady;
export const selectGlobalLoading = (s: UIState) => s.globalLoading;
