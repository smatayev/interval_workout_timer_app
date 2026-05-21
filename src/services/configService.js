import { DEFAULTS } from '../config/defaults';
import { localStorageAdapter } from './localStorageAdapter';

/**
 * Factory that creates a config service bound to a given storage adapter.
 * Inject a mock adapter in tests; the real app uses the default instance below.
 *
 * @param {object} storage  - any IStorage-compatible adapter
 */
export function createConfigService(storage) {
  function getAll() {
    try {
      const raw = storage.getItem(DEFAULTS.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      // Corrupted storage — return empty rather than crashing
      return [];
    }
  }

  /**
   * Prepend a config to the saved list, capping at MAX_SAVED_CONFIGS.
   * Returns the updated list.
   */
  function save(config) {
    const updated = [config, ...getAll()].slice(0, DEFAULTS.MAX_SAVED_CONFIGS);
    storage.setItem(DEFAULTS.STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  function clear() {
    storage.removeItem(DEFAULTS.STORAGE_KEY);
  }

  return { getAll, save, clear };
}

/** Default instance used throughout the app. */
export const configService = createConfigService(localStorageAdapter);
