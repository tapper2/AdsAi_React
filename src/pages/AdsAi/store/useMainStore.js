import { create } from "zustand";
import { addDays, subDays } from "date-fns";


export const useMainStore = create((set) => ({
    date: { from: subDays(new Date(), 30), to: addDays(new Date(), 0), },
    setDate: (date) => set({ date }),
    setFromDate: (from) => set((state) => ({ date: { ...state.date, from, }, })),
    setToDate: (to) => set((state) => ({ date: { ...state.date, to, }, })),
}));
