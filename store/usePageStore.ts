import { create } from 'zustand';

type PageStore = {
  page: number;
  prevPage: () => void;
  nextPage: () => void;
};

export const usePageStore = create<PageStore>((set) => ({
  page: 1,
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
}));
