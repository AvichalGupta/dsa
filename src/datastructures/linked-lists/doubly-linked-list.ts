import { MAX_SIZE } from '../../constants';

// Space Complexity: 
// Time Complexity: 
const DLL_OWNER = Symbol('DLL_OWNER');
const DLL_NODE = Symbol('DLL_NODE');

export interface DoublyLinkedListNode<T> {
    readonly data: T | null;
    readonly [DLL_NODE]: true;
}

class InternalDoublyLinkedListNode<T> implements DoublyLinkedListNode<T> {
    readonly [DLL_NODE] = true;
    readonly [DLL_OWNER]: DoublyLinkedList<T>;

    public data: T | null;
    public next: InternalDoublyLinkedListNode<T> | null = null;
    public prev: InternalDoublyLinkedListNode<T> | null = null;

    constructor(data: T | null, owner: DoublyLinkedList<T>) {
        this.data = data;
        this[DLL_OWNER] = owner;
    }
}

export type DoublyLinkedListOptions = {
    maxSize: number
}

export class DoublyLinkedList<T> {
    private readonly head: InternalDoublyLinkedListNode<T>;
    private readonly tail: InternalDoublyLinkedListNode<T>;
    private readonly options: Readonly<DoublyLinkedListOptions>;
    private currentSize: number;

    constructor(ops?: DoublyLinkedListOptions) {
        this.head = new InternalDoublyLinkedListNode<T>(null, this);
        this.tail = new InternalDoublyLinkedListNode<T>(null, this);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.options = {
            maxSize: ops?.maxSize ?? MAX_SIZE
        };
        this.currentSize = 0;
    }

    unlinkNode(node: DoublyLinkedListNode<T>): void {
        
        if (!(DLL_NODE in node)) {
            throw new Error("Forged Node");
        }
        
        const internalNode = node as InternalDoublyLinkedListNode<T>;

        if (internalNode[DLL_OWNER] !== this) {
            throw new Error("Node does not belong to this list");
        }

        if (!internalNode.prev || !internalNode.next) {
            throw new Error("Cannot unlink sentinel or detached node");
        }
        
        const nodePrev = internalNode.prev;
        const nodeNext = internalNode.next;

        nodePrev.next = nodeNext;
        nodeNext.prev = nodePrev;
        
        internalNode.next = internalNode.prev = null;

        this.currentSize -= 1;

    }

    pushToFront(value: T): DoublyLinkedListNode<T> {
        if (this.currentSize >= this.options.maxSize) {
            throw new Error('Overflow!');
        }

        const newNode = new InternalDoublyLinkedListNode<T>(value, this);

        if (newNode.prev !== null || newNode.next !== null) {
            throw new Error('Node is already linked');
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

        return newNode;

    }

    popFromFront(): DoublyLinkedListNode<T> {
        if (this.head.next === this.tail) {
            throw new Error('Underflow!')
        }

        const poppedNode = this.head.next!;

        const tempNode = poppedNode.next;
    
        this.head.next = tempNode;

        if (this.head.next === this.tail) {
            this.tail.prev = this.head;
        } else if (tempNode) {
            tempNode.prev = this.head;
        }

        poppedNode.next = poppedNode.prev = null;

        this.currentSize -= 1;

        return poppedNode;
    }

    pushToBack(value: T): DoublyLinkedListNode<T> {
        if (this.currentSize >= this.options.maxSize) {
            throw new Error('Overflow!')
        }

        const newNode = new InternalDoublyLinkedListNode<T>(value, this);

        if (newNode.prev !== null || newNode.next !== null) {
            throw new Error('Node is already linked');
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

        return newNode;

    }

    popFromBack(): DoublyLinkedListNode<T> {
        if (this.tail.prev === this.head) {
            throw new Error('Underflow!')
        }

        const poppedNode = this.tail.prev!;
        
        const tempNode = poppedNode.prev;

        this.tail.prev = tempNode;

        if (this.tail.prev === this.head) {
            this.head.next = this.tail;
        } else if (tempNode) {
            tempNode.next = this.tail;
        }

        poppedNode.next = poppedNode.prev = null;
        
        this.currentSize -= 1;

        return poppedNode;
    }

    getSize(): number {
        return this.currentSize;
    }

    getOptions(): DoublyLinkedListOptions {
        return this.options;
    }
    
    clear() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.currentSize = 0;
    }
}