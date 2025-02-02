import { create } from 'zustand';

type ViewMode = 'live' | 'week' | 'day';

interface ViewModeState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useViewModeStore = create<ViewModeState>((set) => ({
  viewMode: 'live',
  setViewMode: (mode) => set({ viewMode: mode }),
}));