/**
 * Thin, error-safe wrapper over window.localStorage.
 * Conforms to the IStorage interface:
 *   getItem(key: string): string | null
 *   setItem(key: string, value: string): void
 *   removeItem(key: string): void
 *
 * Swap this for any other adapter (sessionStorage, IndexedDB, remote API)
 * without touching the rest of the codebase.
 */
export const localStorageAdapter = {
  getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Storage may be full or unavailable (e.g. private-browsing quota)
    }
  },

  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
