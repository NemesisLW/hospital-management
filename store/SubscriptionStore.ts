import { create } from "zustand";

interface SubscriptionState {
  subscription: null | undefined;
  setSubscription: (subscription: null) => void;
}
export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription(subscription) {
    set({ subscription });
  },
}));
