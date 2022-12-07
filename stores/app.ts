import create from "zustand";

interface AppState {
  counter: number;

  increment: (n: number) => void;
  decrement: (n: number) => void;
}

const useAppStore = create<AppState>()((set) => ({
  counter: 0,

  increment: (n: number) => {
    set((oldState) => ({ counter: oldState.counter + n }));
  },

  decrement: (n: number) => {
    set((oldState) => ({
      counter: oldState.counter - n,
    }));
  },
}));

export default useAppStore;
