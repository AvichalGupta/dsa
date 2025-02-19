// Space Complexity:
// Time Complexity: 
export class Queue<T> {
    private items: Array<T>;
    private maxSize: number;

    constructor(maxSize?: number) {
        this.items = new Array();
        this.maxSize = maxSize || Number.MAX_SAFE_INTEGER;
    }

    public enqueue(item: T): void {
        if (this.isFull()) throw new Error('Queue Overflow');
        this.items.push(item);
    }

    public dequeue(): T | undefined {
        if (this.isEmpty()) throw new Error('Queue Underflow');
        return this.items.shift();
    }

    public peek(): T {
        if (this.isEmpty()) throw new Error('Queue Underflow');
        return this.items[0];
    }

    public printElements(): void {
        if (this.isEmpty()) console.log('Empty Queue');
        console.log('Queue Values: ', this.items);
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public size(): number {
        return this.items.length;
    }

    public flush(): void {
        this.items = new Array();
    }

    public isFull(): boolean {
        return this.maxSize === this.size();
    }
}