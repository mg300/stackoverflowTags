import { create } from "zustand";

interface IData {
  count: number;
  name: string;
}
interface items {
  items: IData[];
}
interface IAPIState {
  rows: IData[];
  loading: boolean;
  error: string | null;
  fetchData: (url: string) => Promise<void>;
}

const useFetch = create<IAPIState>((set) => ({
  rows: [],
  loading: true,
  error: null,
  fetchData: async (url) => {
    set({ loading: true });
    try {
      const response: Response = await fetch(url);
      if (!response.ok) {
        set({ loading: false, error: "Something went wrong" });
        return;
      }
      const jsonData: items = await response.json();
      set({ rows: jsonData.items, loading: false, error: null });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default useFetch;
