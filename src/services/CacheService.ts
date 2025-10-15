
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheService {
  private static CACHE_PREFIX = 'utm_cache_';

  public static set<T>(key: string, data: T, ttlMinutes: number = 30): void {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttlMinutes * 60 * 1000
      };
      
      localStorage.setItem(
        `${this.CACHE_PREFIX}${key}`,
        JSON.stringify(cacheItem)
      );
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  public static get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_PREFIX}${key}`);
      if (!cached) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is still valid
      if (now - cacheItem.timestamp > cacheItem.ttl) {
        this.remove(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  }

  public static remove(key: string): void {
    try {
      localStorage.removeItem(`${this.CACHE_PREFIX}${key}`);
    } catch (error) {
      console.warn('Failed to remove cached data:', error);
    }
  }

  public static clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}

export default CacheService;
