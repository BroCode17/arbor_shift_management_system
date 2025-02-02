import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  language: string;
  timeFormat: '12h' | '24h';
}

interface SettingsStore {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          desktop: true,
        },
        language: 'en',
        timeFormat: '24h',
      },
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
    }),
    {
      name: 'arbor-settings',
    }
  )
);