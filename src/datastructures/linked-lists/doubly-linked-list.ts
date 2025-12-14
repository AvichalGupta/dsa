// Space Complexity: 

import { MAX_SIZE } from "../../constants";

// Time Complexity: 
class DoublyLinkedListNode<T> {
    public data: T;
    public next: DoublyLinkedListNode<T> | null;
    public prev: DoublyLinkedListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyLinkedList<T> {
    private head: DoublyLinkedListNode<T> | null;
    private tail: DoublyLinkedListNode<T> | null;
    private maxSize: number;
    private currentSize: number;

    constructor(maxSize?: number) {
        this.head = null;
        this.tail = null;
        this.maxSize = maxSize || MAX_SIZE;
        this.currentSize = 0;
    }

    private findNodeByIndex(index: number): DoublyLinkedListNode<T> {
        let currentNode = this.head;
        for (let currentPosition = 0; currentPosition <= index; currentPosition++) {
            currentNode = currentNode!.next;
        }
        return currentNode!;
    }

    public appendAtStart(data: T): void {
        this.append(data, 0);
    }

    public appendAtEnd(data: T): void {
        this.append(data, this.size() - 1);
    }

    public appendAtPosition(data: T, index: number): void {
        this.append(data, index);
    }

    public removeAtStart(): T {
        return this.remove(0);
    }

    public removeAtEnd(): T {
        return this.remove(this.size() - 1);
    }

    public removeAtPosition(index: number): T {
        return this.remove(index);
    }

    public append(data: T, index: number): void {
        if (this.isFull()) throw new Error('Doubly Linked List Overflow');

        const newNode = new DoublyLinkedListNode(data);

        if (!this.head || !this.tail) {
            this.head = this.tail = newNode;
        } else {
            if (index === 0) {
                // Insert at start
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            } else if (index = this.size() - 1) {
                // Insert at end
                newNode.prev = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            } else {
                // Insert at index
                if (index < 0 || index >= this.size()) throw new Error('Index out of bounds')
                const currentNode = this.findNodeByIndex(index);

                newNode.prev = currentNode.prev;
                newNode.next = currentNode;
                currentNode.prev!.next = newNode;
                currentNode.prev = newNode;
            }
        }
        this.currentSize++;
    }

    public remove(index: number): T {
        if (this.isEmpty()) throw new Error('Doubly Linked List Underflow');

        let poppedValue: T;
        if (this.size() === 1) {
            poppedValue = this.head!.data;
            this.head = this.tail = null;
        } else if (index === 0) {
            // Remove at start
            poppedValue = this.head!.data;
            this.head = this.head!.next;
            this.head!.prev = null;
        } else if (index === this.size() - 1) {
            // Remove at end
            poppedValue = this.tail!.data;
            this.tail = this.tail!.prev;
            this.tail!.next = null;
        } else {
            // Remove at index
            if (index < 0 || index >= this.size()) throw new Error('Index out of bounds')
            const currentNode = this.findNodeByIndex(index);
            poppedValue = currentNode!.data;
            currentNode.prev!.next = currentNode.next;
            currentNode.next!.prev = currentNode.prev;
        }
        this.currentSize--;
        return poppedValue;
    }

    public peek(index: number) {
        if (this.isEmpty()) throw new Error('Doubly Linked List Underflow');

        if (index === 0) {
            // Peel from start
            return this.head!.data;
        } else if (index === this.size() - 1) {
            // Peek from end
            return this.tail!.data;
        } else {
            // Peek at index
            if (index < 0 || index >= this.size()) throw new Error('Index out of bounds')
            return this.findNodeByIndex(index).data;
        }
    }

    public print(): void {
        if (this.isEmpty()) throw new Error('Singly Linked List Underflow');
        let currentNode = this.head;

        const valuesArr: Array<T> = [currentNode!.data];

        while(currentNode!.next) {
            valuesArr.push(currentNode!.data);
            currentNode = currentNode!.next;
        }

        console.log('Singly Linked List Values: ', valuesArr);
    }

    public size(): number {
        return this.currentSize;
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public isFull(): boolean {
        return this.size() >= this.maxSize;
    }

    public clear(): void {
        this.head = this.tail = null;
    }

    *[Symbol.iterator]() {
        for (let node = this.head; node; node = node.next) {
            yield node;
        }
    }
}