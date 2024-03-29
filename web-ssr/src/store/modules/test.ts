import { defineStore } from 'pinia';
import { store } from '..';

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useTestStore = defineStore('test', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    doubleCount: (state) => state.counter * 2,
    // use getters in other getters
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1;
    },
  },
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
      this.counter = 0;
    },
  },
});

/** setup之外使用 */
export function useTestStoreOut() {
  return useTestStore(store);
}
