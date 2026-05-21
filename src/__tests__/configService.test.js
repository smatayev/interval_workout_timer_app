import { createConfigService } from '../services/configService';

// In-memory mock adapter — no browser storage involved
function createMockStorage(initial = {}) {
  const store = { ...initial };
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
  };
}

const CONFIG_A = { intervalDuration: { minutes: 1, seconds: 0 }, restDuration: { minutes: 0, seconds: 30 }, totalIntervals: 3 };
const CONFIG_B = { intervalDuration: { minutes: 2, seconds: 0 }, restDuration: { minutes: 1, seconds: 0 }, totalIntervals: 5 };
const CONFIG_C = { intervalDuration: { minutes: 0, seconds: 30 }, restDuration: { minutes: 0, seconds: 15 }, totalIntervals: 8 };
const CONFIG_D = { intervalDuration: { minutes: 3, seconds: 0 }, restDuration: { minutes: 1, seconds: 30 }, totalIntervals: 4 };

describe('configService', () => {
  test('getAll returns an empty array when nothing is stored', () => {
    const service = createConfigService(createMockStorage());
    expect(service.getAll()).toEqual([]);
  });

  test('save stores a config and returns it in the list', () => {
    const service = createConfigService(createMockStorage());
    const result = service.save(CONFIG_A);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(CONFIG_A);
  });

  test('save prepends the newest config so it appears first', () => {
    const service = createConfigService(createMockStorage());
    service.save(CONFIG_A);
    const result = service.save(CONFIG_B);
    expect(result[0]).toEqual(CONFIG_B);
    expect(result[1]).toEqual(CONFIG_A);
  });

  test('save caps the list at MAX_SAVED_CONFIGS (3)', () => {
    const service = createConfigService(createMockStorage());
    [CONFIG_A, CONFIG_B, CONFIG_C, CONFIG_D].forEach(c => service.save(c));
    const all = service.getAll();
    expect(all).toHaveLength(3);
    // Most recent first
    expect(all[0]).toEqual(CONFIG_D);
    expect(all[1]).toEqual(CONFIG_C);
    expect(all[2]).toEqual(CONFIG_B);
  });

  test('getAll returns an empty array when storage contains corrupted JSON', () => {
    const storage = createMockStorage({ timerConfigs: '{not-valid-json}' });
    const service = createConfigService(storage);
    expect(service.getAll()).toEqual([]);
  });

  test('clear removes all saved configs', () => {
    const service = createConfigService(createMockStorage());
    service.save(CONFIG_A);
    service.clear();
    expect(service.getAll()).toEqual([]);
  });

  test('getAll persists across separate service calls', () => {
    const storage = createMockStorage();
    const service = createConfigService(storage);
    service.save(CONFIG_A);
    service.save(CONFIG_B);
    // Simulate a fresh service instance sharing the same storage
    const service2 = createConfigService(storage);
    expect(service2.getAll()).toHaveLength(2);
  });
});
