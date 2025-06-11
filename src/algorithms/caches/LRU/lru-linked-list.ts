import { MAX_SIZE } from "../../../constants";

class LRUNode<K, V> {
    public next: LRUNode<K, V> | null;
    public prev: LRUNode<K, V> | null;
    public key: K;
    public value: V;
    public ttl: number;
    public startDate: number;

    constructor(key: K, value: V, ttl?: number) {
        this.next = null;
        this.prev = null;
        this.key = key;
        this.value = value;
        this.ttl = ttl ?? Number.POSITIVE_INFINITY;
        this.startDate = Date.now();
    }
}

class LinkLisedBasedLRUCache<K, V> {
    private head: LRUNode<K, V> | null;
    private tail: LRUNode<K, V> | null;
    private cache: Map<K, LRUNode<K, V>>;
    private capacity: number;

    constructor(capacity?: number) {
        this.cache = new Map<K, LRUNode<K, V>>();
        this.head = null;
        this.tail = null;
        this.capacity = capacity ?? MAX_SIZE;
    }

    // This is called every time a get/set operation is done, since it increases the recency of the requested key.
    private _moveToHead(node: LRUNode<K, V>) {
        if (this.head === node) return;

        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;

        if (this.tail === node) {
            this.tail = node.prev;
            if (this.tail) this.tail.next = null;
        }

        node.prev = null;
        node.next = this.head;
        if (this.head) this.head.prev = node;
        this.head = node;

        if(!this.tail) {
            this.tail = this.head;
        }
    }

    // This is called every time the cache exceeds it's capacity to avoid overflow conditions by removing the least recently used key.
    private _removeTail(): void {
        if (this.tail) {
            const tailNode = this.tail;
            if (this.tail.prev) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            } else {
                this.head = null;
                this.tail = null;
            }
            this.cache.delete(tailNode.key);
        }
    }

    public get(key: K): LRUNode<K, V> | null {
        const node = this.cache.get(key);
        if (!node) return null;

        if (node.ttl > Date.now() - node.startDate) {
            this._moveToHead(node);
            return node;
        }
        return null;
    }

    public set(key: K, value: V, ttl?: number): void {
        const node = this.get(key);

        if (!node) {
            if (this.cache.size >= this.capacity) {
                this._removeTail();
            }
            const node = new LRUNode<K, V>(key, value, ttl);
            this.cache.set(key, node);
            this._moveToHead(node);
        } else {
            node.value = value;
            node.startDate = Date.now();
            if (ttl) node.ttl = ttl;
            this.cache.set(key, node);
            this._moveToHead(node);
        }
    }

    public ttl(key: K): number {
        const cachedData = this.cache.get(key);

        if (cachedData) {
            if (cachedData.ttl === Number.POSITIVE_INFINITY) return cachedData.ttl
            else if (cachedData.ttl - Date.now() - cachedData.startDate > 0) return cachedData.ttl - Date.now() - cachedData.startDate;
        }
        return -1;
    }

    public delete(key: K): void {
        const node = this.get(key);

        if (node) {
            if (node.prev) node.prev.next = node.next;
            if (node.next) node.next.prev = node.prev;
    
            if (this.head === node) this.head = node.next;
            if (this.tail === node) this.tail = node.prev;
            this.cache.delete(key);
        }
    }

    public flush() {
        this.cache.clear();
        this.head = null;
        this.tail = null;
    }
}