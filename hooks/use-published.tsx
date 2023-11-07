import { create } from "zustand";

type publishedStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: ()=>void
};


export const usePublishedStore = create<publishedStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: ()=> set({isOpen: !get().isOpen})
}));
