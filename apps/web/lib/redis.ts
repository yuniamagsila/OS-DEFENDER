// Stub — install 'ioredis' in production: npm install ioredis
// import Redis from "ioredis";
//
// const globalForRedis = globalThis as unknown as { redis: Redis };
//
// export const redis: Redis =
//   globalForRedis.redis ?? new Redis(process.env.REDIS_URL ?? "redis://localhost:6379");
//
// if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

// Temporary in-memory stub for development without Redis
const store = new Map<string, { value: string; expiresAt?: number }>();

export const redis = {
  async get(key: string): Promise<string | null> {
    const entry = store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      store.delete(key);
      return null;
    }
    return entry.value;
  },

  async set(key: string, value: string, exSeconds?: number): Promise<void> {
    store.set(key, {
      value,
      expiresAt: exSeconds ? Date.now() + exSeconds * 1000 : undefined,
    });
  },

  async del(key: string): Promise<void> {
    store.delete(key);
  },

  async incr(key: string): Promise<number> {
    const current = Number(store.get(key)?.value ?? "0");
    const next = current + 1;
    store.set(key, { value: String(next) });
    return next;
  },
};
