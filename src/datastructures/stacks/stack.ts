// Space Complexity: 

import { MAX_SIZE } from "../../constants/external";

// Time Complexity: 
export class Stack<T> {
    private items: Array<T>;
    private maxSize: number;

    constructor(maxSize?: number) {
        this.items = new Array();
        this.maxSize = maxSize || MAX_SIZE;
    }

    public push(item: T): void {
        if (this.isFull()) throw new Error('Stack Overflow');
        this.items.push(item);
    }

    public pop(): T {
        if (this.isEmpty()) throw new Error('Stack Underflow');
        return this.items.pop()!;
    }

    public peek(): T {
        if (this.isEmpty()) throw new Error('Stack Underflow');
        return this.items[this.size() - 1];
    }

    public printElements(): void {
        if (this.isEmpty()) console.log('Empty Stack');
        console.log('Stack Values: ', Object.values(this.items));
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