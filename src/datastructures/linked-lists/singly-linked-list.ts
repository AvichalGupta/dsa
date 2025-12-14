// Space Complexity: 

import { MAX_SIZE } from "../../constants";

// Time Complexity: 
export class SinglyLinkedListNode<T> {
    public data: T;
    public next: SinglyLinkedListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

export class SinglyLinkedList<T> {
    private head: SinglyLinkedListNode<T> | null;
    private currentSize: number;
    private maxSize: number;

    constructor(maxSize?: number) {
        this.head = null;
        this.currentSize = 0;
        this.maxSize = maxSize ?? MAX_SIZE;
    }

    private findNodeByIndex(index: number): SinglyLinkedListNode<T> {
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
        if (this.isFull()) throw new Error('Singly Linked List Overflow');

        const newNode = new SinglyLinkedListNode<T>(data);
        if (!this.head) {
            this.head = newNode;
        } else if (index === 0) {
            // Insert at start
            newNode.next = this.head;
            this.head = newNode;
        } else if (index === this.size() - 1){
            // Insert at end
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        } else {
            // Insert at index
            if (index < 0 || index >= this.size()) throw new Error('Index out of bounds')
            
            const previousNode = this.findNodeByIndex(index - 1);
            newNode.next = previousNode.next;
            previousNode.next = newNode;
            
        }

        this.currentSize++;
    }

    public remove(index: number): T {
        if (this.isEmpty()) throw new Error('Singly Linked List Underflow');

        let poppedValue: T;
        if (index === 0 || this.size() === 1) {
            // Delete at start
            poppedValue = this.head!.data;
            this.head = this.head!.next;
        } else if (index === this.size() - 1) {
            // Delete at end
            let currentNode: SinglyLinkedListNode<T> | null = this.head;
            let previousNode: SinglyLinkedListNode<T> | null = this.head;
            while (currentNode!.next) {
                previousNode = currentNode;
                currentNode = currentNode!.next;
            }
            previousNode!.next = null;
            poppedValue = currentNode!.data;
        } else {
            // Delete at index
            if (index < 0 || index >= this.size()) throw new Error('Index out of bounds')
            
            const previousNode = this.findNodeByIndex(index - 1);
            poppedValue = previousNode.next!.data;
            previousNode.next = previousNode.next!.next;
        }
        this.currentSize--;
        return poppedValue;
    }

    public peek(index: number): T {
        if (this.isEmpty()) throw new Error('Singly Linked List Underflow');

        if (index === 0) {
            // Peek the start value.
            return this.head!.data;
        } else if (index === this.size() - 1){
            // Peek the end value.
            let currentNode = this.head;
            while (currentNode!.next) {
                currentNode = currentNode!.next;
            }
            return currentNode!.data;
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
        this.head = null;
    }

    *[Symbol.iterator]() {
        for (let node = this.head; node; node = node.next) {
            yield node;
        }
    }
}