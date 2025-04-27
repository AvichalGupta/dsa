interface CacheData<T> {
    value: T;
    ttl: number;
    startDate: number;
}

class MapBasedLRUCache<T> {
    private cache: Map<string, CacheData<T>>;
    private maxCapacity: number;

    constructor(maxCapacity?: number) {
        this.cache = new Map<string, CacheData<T>>();
        this.maxCapacity = maxCapacity ?? Number.POSITIVE_INFINITY;
    }

    public get(key: string): T | undefined {
        const cachedData = this.cache.get(key);

        if (cachedData) {
            this.cache.delete(key);
            if (cachedData.ttl > (Date.now() - cachedData.startDate)) {
                this.cache.set(key, cachedData);
                return cachedData.value;
            }
        }
        return undefined;
    }

    public set(key: string, value: T, ttl?: number): void {
        if (this.cache.size >= this.maxCapacity) {
            const value = this.cache.keys().next().value;
            if (value) {
                this.cache.delete(value);
            }
        }
        this.cache.set(key, { value, ttl: ttl ?? Number.POSITIVE_INFINITY, startDate: Date.now() });
    }

    public delete(key: string): void {
        this.cache.delete(key);
    }

    public ttl(key: string): number {
        const cachedData = this.cache.get(key);

        if (cachedData) {
            if (cachedData.ttl === Number.POSITIVE_INFINITY) return cachedData.ttl
            else if (cachedData.ttl - Date.now() - cachedData.startDate > 0) return cachedData.ttl - Date.now() - cachedData.startDate;
        }
        return -1;
    }

    public flush() {
        this.cache.clear();
    }
}