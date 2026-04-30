import { openDB } from "idb";

const DB_NAME = "web-os";
const DB_VERSION = 1;
const STORE = "kv";

export async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    },
  });
}

export async function kvGet<T>(key: string): Promise<T | undefined> {
  const db = await getDb();
  return db.get(STORE, key);
}

export async function kvSet<T>(key: string, value: T) {
  const db = await getDb();
  return db.put(STORE, value, key);
}

export async function kvDel(key: string) {
  const db = await getDb();
  return db.delete(STORE, key);
}

export async function kvClearAll() {
  const db = await getDb();
  return db.clear(STORE);
}
