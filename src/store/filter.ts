import { create } from "zustand";

import { Place } from "@/types";

export type FilterKeys = keyof Pick<
  Place,
  "extension_flexibility" | "review_score" | "host_response_rate" | "distance"
>;

export type FilterValues = {
  key: FilterKeys;
  value?: number | number[];
  weight?: number;
  max: number;
};

interface FilterStoreState {
  filterSelected: FilterValues[];
  setFilterSelected: (filterValues: FilterValues) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStoreState>((set) => ({
  filterSelected: [],
  setFilterSelected: (filterValues) =>
    set((state) => {
      const newFilter = state.filterSelected.filter(
        (filter) => filter.key !== filterValues.key
      );
      newFilter.push(filterValues);
      return { filterSelected: newFilter };
    }),
  resetFilters: () => set({ filterSelected: [] }),
}));
