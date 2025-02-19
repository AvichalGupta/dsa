// Space Complexity: 
// Time Complexity: 
export class CircularStack<T> {
    private items: Array<T | null>;
    private maxSize: number;
    private topIndex: number;
    private currentSize: number;

    constructor(maxSize: number) {
        this.items = new Array(maxSize).fill(null);
        this.maxSize = maxSize;
        this.topIndex = -1;
        this.currentSize = 0;
    }

    public push(item: T): void {
        if (this.isFull()) throw new Error('Circular Stack Overflow');
        this.topIndex = (this.topIndex + 1) % this.maxSize;
        this.items[this.topIndex] = item;
        this.currentSize++;
    }

    public pop(): T | null {
        if (this.isEmpty()) throw new Error('Circular Stack Underflow');
        const poppedItem = this.items[this.topIndex];
        this.items[this.topIndex] = null;
        this.topIndex = (this.topIndex + 1) % this.maxSize;
        this.currentSize--;
        return poppedItem;
    }

    public peek(): T | null {
        if (this.isEmpty()) throw new Error('Circular Stack Underflow');
        return this.items[this.topIndex];
    }

    public printElements(): void {
        if (this.isEmpty()) console.log('Empty Circular Stack');
        console.log('Circular Stack Values: ', Object.values(this.items));
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public size(): number {
        return this.currentSize;
    }

    public flush(): void {
        this.items = new Array(this.maxSize).fill(null);
        this.topIndex = -1;
        this.currentSize = 0;
    }

    public isFull(): boolean {
        return this.maxSize === this.size();
    }
}