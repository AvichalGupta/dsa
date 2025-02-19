// Space Complexity: 
// Time Complexity: 
export class CircularQueue<T> {
    private items: Array<T | null>;
    private frontIndex: number;
    private backIndex: number;
    private currentSize: number;
    private maxSize: number;

    constructor(maxSize: number) {
        this.items = new Array(maxSize).fill(null);
        this.maxSize = maxSize;
        this.frontIndex = 0;
        this.backIndex = -1;
        this.currentSize = 0;
    }

    public enqueue(item: T): void {
        if (this.isFull()) throw new Error('Circular Queue Overflow');
        this.backIndex = (this.backIndex + 1) % this.maxSize;
        this.items[this.backIndex] = item;
        this.currentSize++;
    }

    public dequeue(): T | null {
        if (this.isEmpty()) throw new Error('Circular Queue Underflow');
        const poppedItem = this.items[this.frontIndex];
        this.items[this.frontIndex] = null;
        this.frontIndex = (this.frontIndex + 1) % this.maxSize;
        this.currentSize--;
        return poppedItem;
    }


    public peek(): T | null {
        if (this.isEmpty()) throw new Error('Circular Queue Underflow');
        return this.items[this.frontIndex];
    }

    public printElements(): void {
        if (this.isEmpty()) console.log('Empty Circular Queue');
        console.log('Circular Queue Values: ', Object.values(this.items));
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public size(): number {
        return this.currentSize;
    }

    public flush(): void {
        this.items = new Array(this.maxSize).fill(null);
        this.frontIndex = 0;
        this.backIndex = -1;
        this.currentSize = 0;
    }

    public isFull(): boolean {
        return this.maxSize === this.size();
    }
}