import { RefObject } from "react";
import { create } from "zustand";
type ExportStore = {
  containerToExportRef: RefObject<HTMLDivElement> | null;
  setContainerToExportRef: (ref: RefObject<HTMLDivElement>) => void;
};

export const useExportStore = create<ExportStore>((set) => ({
  containerToExportRef: null,
  setContainerToExportRef: (ref) => set({ containerToExportRef: ref }),
}));
