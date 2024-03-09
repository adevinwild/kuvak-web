import { create } from "zustand";

type UploadState = {
  imageUploaded: File | null;
  setImage: (_image: File) => void;
  reset: () => void;
};

export const useUploadStore = create<UploadState>((set) => ({
  imageUploaded: null,
  setImage: (_image) => set({ imageUploaded: _image }),
  reset: () => set({ imageUploaded: null }),
}));
