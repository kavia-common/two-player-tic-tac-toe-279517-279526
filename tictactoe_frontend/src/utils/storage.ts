type Storable = string;

type AsyncStorageLike = {
  getItem(key: string): Promise<Storable | null>;
  setItem(key: string, value: Storable): Promise<void>;
  removeItem(key: string): Promise<void>;
};

let AsyncStorageModule: AsyncStorageLike | null = null;

async function getStorage(): Promise<AsyncStorageLike> {
  if (AsyncStorageModule) return AsyncStorageModule;
  try {
    // Lazy import to avoid platform issues; not mandatory for running tests.
    const mod = await import('@react-native-async-storage/async-storage');
    // Some bundlers expose default, others named export; handle both safely.
    const storage = (mod as unknown as { default?: AsyncStorageLike }).default;
    if (storage && typeof storage.getItem === 'function') {
      AsyncStorageModule = storage;
    }
  } catch {
    // ignore; will fall back to shim
  }
  if (!AsyncStorageModule) {
    // Fallback shim (no-op) if AsyncStorage not installed/available in environment
    AsyncStorageModule = {
      async getItem(): Promise<Storable | null> {
        return null;
      },
      async setItem(): Promise<void> {
        return;
      },
      async removeItem(): Promise<void> {
        return;
      },
    };
  }
  return AsyncStorageModule;
}

/**
 * PUBLIC_INTERFACE
 * Persist a JSON-serializable value safely.
 */
export async function persist<T>(key: string, value: T): Promise<void> {
  try {
    const storage = await getStorage();
    const data = JSON.stringify(value);
    await storage.setItem(key, data);
  } catch {
    // Fail silently to avoid exposing internals; non-critical persistence.
  }
}

/**
 * PUBLIC_INTERFACE
 * Restore a value from storage safely.
 */
export async function restore<T>(key: string, fallback: T): Promise<T> {
  try {
    const storage = await getStorage();
    const raw = await storage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * PUBLIC_INTERFACE
 * Remove a key safely.
 */
export async function remove(key: string): Promise<void> {
  try {
    const storage = await getStorage();
    await storage.removeItem(key);
  } catch {
    // ignore
  }
}
