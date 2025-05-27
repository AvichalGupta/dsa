// Space Complexity:
// Time Complexity: 
export class Queue<T> {
    private items: Array<T>;
    private maxSize: number;
    private startIndex: number;
    private flushSize: number;

    constructor(maxSize?: number) {
        if (maxSize === 0) throw new Error('Cannot initialise queue of size 0');
        if (maxSize && maxSize > Number.MAX_SAFE_INTEGER) throw new Error('Queue size cannot be greater than Number.MAX_SAFE_INTEGER');
        
        this.startIndex = 0;
        this.items = new Array();
        this.maxSize = maxSize || Number.MAX_SAFE_INTEGER;
        this.flushSize = 1;
    }

    public enqueue(item: T): void {
        if (this.isFull()) throw new Error('Queue Overflow');
        const newFlushSize = this.items.push(item);
        this.flushSize = Math.ceil(newFlushSize / 2);
    }

    // Amortised: O(1)
    public dequeue(): T {
        if (this.isEmpty()) throw new Error('Queue Underflow');
        if (this.startIndex === this.flushSize) {
            this.items.splice(0, this.flushSize);
            this.startIndex = 0;
            this.flushSize = Math.ceil(this.size() / 2);
        }
        return this.items[this.startIndex++];
    }

    public peek(): T {
        if (this.isEmpty()) throw new Error('Queue Underflow');
        return this.items[this.startIndex];
    }

    public printElements(): void {
        if (this.isEmpty()) console.log('Empty Queue');
        console.log('Queue Values: ', this.items);
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public size(): number {
        return this.items.length - this.startIndex;
    }

    public flush(): void {
        this.items = new Array();
    }

    public isFull(): boolean {
        return this.maxSize === this.size();
    }
}