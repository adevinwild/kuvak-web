import { create } from 'zustand'

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
  Sunset = 'sunset',
  Mushroom = 'mushroom',
  Apollo = 'apollo',
}

type SettingsState = {
  scale: number
  theme: ThemeEnum
  padding: number
  roundness: number
  setScale: (scale: number) => void
  setTheme: (theme: ThemeEnum) => void
  setPadding: (padding: number) => void
  setRoundness: (roundness: number) => void
  reset: () => void
}

const initialState: Omit<SettingsState, `set${string}` | 'reset'> = {
  scale: 1,
  theme: ThemeEnum.Light,
  padding: 8,
  roundness: 8,
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...initialState,
  setScale: (scale: number) => set({ scale }),
  setTheme: (theme: ThemeEnum) => set({ theme }),
  setPadding: (padding: number) => set({ padding }),
  setRoundness: (roundness: number) => set({ roundness }),
  reset: () =>
    set({
      ...initialState,
    }),
}))
