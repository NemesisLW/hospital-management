import { create } from "zustand";

interface SessionState {
  isLoggedIn: boolean;
  logout: () => void;
  name: string;
  setName: (name: string) => void;
  role: string;
  setRole: (role: string) => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  isLoggedIn: false,
  logout: () => set({ isLoggedIn: false }),
  name: "",
  role: "",
  setName(input: string) {
    set({ name: input });
  },
  setRole(input: string) {
    set({ role: input });
  },
}));
