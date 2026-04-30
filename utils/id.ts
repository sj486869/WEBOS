export function createId(prefix?: string) {
  const raw = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  return prefix ? `${prefix}_${raw}` : raw;
}
