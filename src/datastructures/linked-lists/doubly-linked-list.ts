import { MAX_SIZE } from "../../constants";

// Space Complexity: 
// Time Complexity: 
export class DoublyLinkedListNode<T> {
    public data: T | null;
    public next: DoublyLinkedListNode<T> | null;
    public prev: DoublyLinkedListNode<T> | null;

    constructor(data: T | null) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

export type DoublyLinkedListOptions = {
    maxSize: number
    failSilently: boolean
}

export class PrimitiveDoublyLinkedList<T> {
    private readonly head: DoublyLinkedListNode<T>;
    private readonly tail: DoublyLinkedListNode<T>;
    private readonly options: Readonly<DoublyLinkedListOptions>;
    private currentSize: number;

    constructor(ops?: DoublyLinkedListOptions) {
        this.head = new DoublyLinkedListNode<T>(null);
        this.tail = new DoublyLinkedListNode<T>(null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.options = {
            maxSize: ops?.maxSize ?? MAX_SIZE,
            failSilently: ops?.failSilently ?? false,
        };
        this.currentSize = 0;
    }

    public pushToFront(newNode: DoublyLinkedListNode<T>): boolean {
        if (this.currentSize >= this.options.maxSize) {
            throw new Error('Overflow!')
        }

        if (newNode.prev !== null || newNode.next !== null) {
            throw new Error("Node is already linked");
        }

        const headNext = this.head.next;
        
        newNode.prev = this.head;
        newNode.next = headNext;
        
        this.head.next = newNode;

        if (headNext) {
            headNext.prev = newNode;
        }

        if (this.tail.prev === this.head) {
            this.tail.prev = newNode;
        }
        
        this.currentSize += 1;

        return true;
    }

    popFromFront(): DoublyLinkedListNode<T> | null {
        if (this.head.next === this.tail) {
            throw new Error('Underflow!')
        }

        const poppedNode = this.head.next;

        if (poppedNode) {
            const tempNode = poppedNode.next;
    
            this.head.next = tempNode;
    
            if (this.head.next === this.tail) {
                this.tail.prev = this.head;
            } else if (tempNode) {
                tempNode.prev = this.head;
            }

            poppedNode.next = poppedNode.prev = null;

            this.currentSize -= 1;
        }

        return poppedNode;
    }

    pushToBack(newNode: DoublyLinkedListNode<T>): boolean {
        if (this.currentSize >= this.options.maxSize) {
            throw new Error('Overflow!')
        }

        if (newNode.prev !== null || newNode.next !== null) {
            throw new Error("Node is already linked");
        }
        
        const tailPrev = this.tail.prev;

        newNode.next = this.tail;
        newNode.prev = tailPrev;

        this.tail.prev = newNode;

        if (tailPrev) {
            tailPrev.next = newNode;
        }

        if (this.head.next === this.tail) {
            this.head.next = newNode;
        }
        
        this.currentSize += 1;

        return true;
    }

    popFromBack(): DoublyLinkedListNode<T> | null {
        if (this.tail.prev === this.head) {
            throw new Error('Underflow!')
        }

        const poppedNode = this.tail.prev;

        if (poppedNode) {
            const tempNode = poppedNode.prev;
    
            this.tail.prev = tempNode;
    
            if (this.tail.prev === this.head) {
                this.head.next = this.tail;
            } else if (tempNode) {
                tempNode.next = this.tail;
            }

            poppedNode.next = poppedNode.prev = null;
            
            this.currentSize -= 1;
        }

        return poppedNode;
    }

    getSize(): number {
        return this.currentSize;
    }
}

export class ValueBasedDoublyLinkedList<T>{
    private primitiveDoublyLinkedList: PrimitiveDoublyLinkedList<T>;
    constructor(ops?: DoublyLinkedListOptions) {
        this.primitiveDoublyLinkedList = new PrimitiveDoublyLinkedList<T>(ops);
    }

    pushToFront(value: T): boolean {
        return this.primitiveDoublyLinkedList.pushToFront(new DoublyLinkedListNode<T>(value));
    }

    popFromFront(): T | null {
        const poppedNode = this.primitiveDoublyLinkedList.popFromFront();

        if (poppedNode) {
            return poppedNode.data;
        }

        return null;
    }

    pushToBack(value: T): boolean {
        return this.primitiveDoublyLinkedList.pushToBack(new DoublyLinkedListNode<T>(value));
    }

    popFromBack(): T | null {
        const poppedNode = this.primitiveDoublyLinkedList.popFromBack();

        if (poppedNode) {
            return poppedNode.data;
        }

        return null;
    }

}