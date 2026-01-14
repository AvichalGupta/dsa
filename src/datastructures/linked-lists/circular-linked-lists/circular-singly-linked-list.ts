import { MAX_SIZE } from "../../../constants/external";
import { generateOwner } from "../../../constants/internal";

// Space Complexity: 
// Time Complexity: 
// This interface is exported to allow users to set types in their code explicitly if needed.
export interface CircularSinglyLinkedListNode<T> {
    readonly data: T | null;
    getNext(): CircularSinglyLinkedListNode<T> | null;
}

// This class is hidden to avoid new nodes being created outside the scope of the SLL. 
// Nodes can only be created by the SLL and it's methods.
class InternalCircularSinglyLinkedListNode<T> implements CircularSinglyLinkedListNode<T> {
    public data: T | null;
    #next: InternalCircularSinglyLinkedListNode<T> | null = null;
    #owner: symbol;

    constructor(data: T | null, owner: symbol) {
        this.data = data;
        this.#owner = owner;
    }

    getNext(): InternalCircularSinglyLinkedListNode<T> | null {
        return this.#next;
    }

    setNext(node: InternalCircularSinglyLinkedListNode<T> | null, owner: symbol): InternalCircularSinglyLinkedListNode<T> {
        if (!this.validateOwner(owner)) {
            throw new Error('Cannot mutate node\'s internal properties');
        }
        
        this.#next = node;
        return this;
    }

    validateOwner(owner: symbol) {
        return this.#owner === owner;
    }
}

export type CircularSinglyLinkedListOptions = {
    maxSize: number;
}

export class CircularSinglyLinkedList<T> {
    #head: InternalCircularSinglyLinkedListNode<T>;
    #tail: InternalCircularSinglyLinkedListNode<T>;
    #options: CircularSinglyLinkedListOptions;
    #currentSize: number;
    #owner: symbol;

    constructor(ops?: CircularSinglyLinkedListOptions) {
        if (ops?.maxSize && ops?.maxSize <= 0) throw new Error('Max size must be greater than 0')
        
        this.#owner = generateOwner("SLL_OWNER");
        this.#head = new InternalCircularSinglyLinkedListNode<T>(null, this.#owner);
        this.#tail = new InternalCircularSinglyLinkedListNode<T>(null, this.#owner);
        this.#head.setNext(this.#tail, this.#owner);
        this.#tail.setNext(this.#head, this.#owner);
        this.#options = {
            maxSize: ops?.maxSize ?? MAX_SIZE
        };
        this.#currentSize = 0;
    }

    // Since SLL are unidirectional, this function was created to allow random access insertion in SLL.
    insertAfterNode(node: CircularSinglyLinkedListNode<T>, value: T | null): CircularSinglyLinkedListNode<T> {
        
        if (this.#currentSize >= this.#options.maxSize) {
            throw new Error('Overflow!')
        }

        if (!(node instanceof InternalCircularSinglyLinkedListNode)) {
            throw new Error('Artificial Node detected')
        }
        
        const internalNode = node as InternalCircularSinglyLinkedListNode<T>;

        const canProceed = internalNode.validateOwner(this.#owner);

        if (!canProceed) {
            throw new Error('Node does not belong to this list');
        }

        if (internalNode === this.#tail) {
            throw new Error('Cannot insert after tail');
        }

        const newNode = new InternalCircularSinglyLinkedListNode<T>(value, this.#owner);

        const nextConnectedNode = internalNode.getNext();
        newNode.setNext(nextConnectedNode, this.#owner);
        internalNode.setNext(newNode, this.#owner);

        this.#currentSize += 1;

        return newNode;
    }

    // Since SLL are unidirectional, this function was created to allow random access deletion in SLL.
    // The parentNode must be passed to allow deletion after given node.
    // This is by design, if this function were to unlink the parentNode itself, it must have access to it's prev element. 
    // This makes it a DLL, hence stuck with this pattern.
    unlinkAfterNode(parentNode: CircularSinglyLinkedListNode<T>): CircularSinglyLinkedListNode<T> {

        if (this.#head.getNext() === this.#tail) {
            throw new Error('Underflow!')
        }

        if (!(parentNode instanceof InternalCircularSinglyLinkedListNode)) {
            throw new Error('Artificial Node detected')
        }
        
        const internalNode = parentNode as InternalCircularSinglyLinkedListNode<T>;

        const canProceed = internalNode.validateOwner(this.#owner);

        if (!canProceed) {
            throw new Error('Node does not belong to this list');
        }

        if (!internalNode.getNext()) {
            throw new Error('Cannot unlink sentinel or detached node');
        }
        
        const nodeNext = internalNode.getNext();

        if (nodeNext) {
            internalNode.setNext(nodeNext.getNext(), this.#owner);
            nodeNext.setNext(null, this.#owner);
        }

        this.#currentSize -= 1;

        return nodeNext as CircularSinglyLinkedListNode<T>;

    }

    pushAfterHead(value: T | null): CircularSinglyLinkedListNode<T> {
        return this.insertAfterNode(this.#head, value);
    }

    popAfterHead(): CircularSinglyLinkedListNode<T> {
        return this.unlinkAfterNode(this.#head.getNext()!);
    }

    peekAfterHead(): CircularSinglyLinkedListNode<T> {
        return this.#head.getNext() as CircularSinglyLinkedListNode<T>;
    }

    findParent(node: CircularSinglyLinkedListNode<T>): CircularSinglyLinkedListNode<T> | null {
        let currentNode: CircularSinglyLinkedListNode<T> | null = this.#head;
        while (currentNode) {
            if (currentNode.getNext() === node) {
                return currentNode ?? null;
            }
            currentNode = currentNode.getNext();
        }
        return null;
    }

    getSize(): number {
        return this.#currentSize;
    }

    getOptions(): CircularSinglyLinkedListOptions {
        return this.#options;
    }

    clear() {
        this.#head = new InternalCircularSinglyLinkedListNode<T>(null, this.#owner);
        this.#head.setNext(null, this.#owner);
        this.#currentSize = 0;
    }

    *[Symbol.iterator]() {
        if (this.#head.getNext() === this.#tail) {
            return;
        }
        
        for (let node = this.#head.getNext(); node !== null; node = node.getNext()) {
            if (node === this.#head || node === this.#tail) {
                continue;
            }
            
            yield node;
        }
    }
    
    *reverse() {
        if (this.#head.getNext() === this.#tail) {
            return;
        }

        let newHead: InternalCircularSinglyLinkedListNode<T> = new InternalCircularSinglyLinkedListNode<T>(null, this.#owner);
        let newTail: InternalCircularSinglyLinkedListNode<T> = new InternalCircularSinglyLinkedListNode<T>(null, this.#owner);

        outerLoop: for (let node: InternalCircularSinglyLinkedListNode<T> | null = this.#head.getNext(); node !== null; node = node.getNext()) {
            const newNode = new InternalCircularSinglyLinkedListNode<T>(node.data, this.#owner);
            newNode.setNext(node === this.#head.getNext() ? newTail : newHead, this.#owner);
            newHead = newNode;
            if (node === this.#tail) {
                break outerLoop;
            }
        }

        newTail.setNext(newHead, this.#owner);

        for (let node: InternalCircularSinglyLinkedListNode<T> | null = newTail; node !== null; node = node.getNext()) {
            if (node === newHead || node === newTail) {
                continue;
            }
            
            yield node;
        }
    }
}