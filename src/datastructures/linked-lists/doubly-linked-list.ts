import { MAX_SIZE } from '../../constants/external';
import { generateOwner } from '../../constants/internal';

// Space Complexity: 
// Time Complexity: 

// This interface is exported to allow users to set types in their code explicitly if needed.
export interface DoublyLinkedListNode<T> {
    readonly data: T | null;
    getPrev(): DoublyLinkedListNode<T> | null;
    getNext(): DoublyLinkedListNode<T> | null;
}

// This class is hidden to avoid new nodes being created outside the scope of the DLL. 
// Nodes can only be created by the DLL and it's methods.
class InternalDoublyLinkedListNode<T> implements DoublyLinkedListNode<T> {
    public data: T | null;
    #next: InternalDoublyLinkedListNode<T> | null = null;
    #prev: InternalDoublyLinkedListNode<T> | null = null;
    #owner: symbol;

    constructor(data: T | null, owner: symbol) {
        this.data = data;
        this.#owner = owner;
    }

    getNext(): InternalDoublyLinkedListNode<T> | null {
        return this.#next;
    }

    getPrev(): InternalDoublyLinkedListNode<T> | null {
        return this.#prev;
    }

    setNext(node: InternalDoublyLinkedListNode<T> | null, owner: symbol): InternalDoublyLinkedListNode<T> {
        if (!this.validateOwner(owner)) {
            throw new Error('Cannot mutate node\'s internal properties');
        }
        
        this.#next = node;
        return this;
    }

    setPrev(node: InternalDoublyLinkedListNode<T> | null, owner: symbol): InternalDoublyLinkedListNode<T> {
        if (!this.validateOwner(owner)) {
            throw new Error('Cannot mutate node\'s internal properties');
        }
        
        this.#prev = node;
        return this;
    }

    validateOwner(owner: symbol) {
        return this.#owner === owner;
    }
}

export type DoublyLinkedListOptions = {
    maxSize: number;
}

export class DoublyLinkedList<T> {
    #head: InternalDoublyLinkedListNode<T>;
    #tail: InternalDoublyLinkedListNode<T>;
    #options: DoublyLinkedListOptions;
    #currentSize: number;
    #owner: symbol;

    constructor(ops?: DoublyLinkedListOptions) {
        if (ops?.maxSize && ops?.maxSize <= 0) throw new Error('Max size must be greater than 0')
        
        this.#owner = generateOwner("DLL_OWNER");
        this.#head = new InternalDoublyLinkedListNode<T>(null, this.#owner);
        this.#tail = new InternalDoublyLinkedListNode<T>(null, this.#owner);
        this.#head.setNext(this.#tail, this.#owner);
        this.#tail.setPrev(this.#head, this.#owner);
        this.#options = {
            maxSize: ops?.maxSize ?? MAX_SIZE
        };
        this.#currentSize = 0;
    }

    // To allow bi-directional inserts and random access pattern, this function was created. 
    // It allows insertion before the node passed in params.
    // It returns the newly added node
    insertBefore(node: DoublyLinkedListNode<T>, value: T): DoublyLinkedListNode<T> {
        
        if (this.#currentSize >= this.#options.maxSize) {
            throw new Error('Overflow!')
        }

        if (!(node instanceof InternalDoublyLinkedListNode)) {
            throw new Error('Artificial Node detected')
        }
        
        const internalNode = node as InternalDoublyLinkedListNode<T>;

        const canProceed = internalNode.validateOwner(this.#owner);

        if (!canProceed) {
            throw new Error('Node does not belong to this list');
        }

        if (internalNode.getPrev() === null && internalNode.getNext() === null) {
            throw new Error('Cannot link detached node');
        }

        if (internalNode === this.#head) {
            throw new Error('Cannot add before head');
        }

        const newNode = new InternalDoublyLinkedListNode<T>(value, this.#owner);

        const prevConnectedNode = internalNode.getPrev();

        newNode.setNext(internalNode, this.#owner);

        internalNode.setPrev(newNode, this.#owner);

        if (prevConnectedNode) {
            newNode.setPrev(prevConnectedNode, this.#owner);
            prevConnectedNode.setNext(newNode, this.#owner);
        }

        this.#currentSize += 1;

        return newNode;
    }
    
    // To allow bi-directional inserts and random access pattern, this function was created. 
    // It allows insertion after the node passed in params.
    // It returns the newly added node
    insertAfter(node: DoublyLinkedListNode<T>, value: T): DoublyLinkedListNode<T> {

        if (this.#currentSize >= this.#options.maxSize) {
            throw new Error('Overflow!')
        }

        if (!(node instanceof InternalDoublyLinkedListNode)) {
            throw new Error('Artificial Node detected')
        }
        
        const internalNode = node as InternalDoublyLinkedListNode<T>;

        const canProceed = internalNode.validateOwner(this.#owner);

        if (!canProceed) {
            throw new Error('Node does not belong to this list');
        }

        if (internalNode.getPrev() === null && internalNode.getNext() === null) {
            throw new Error('Cannot link detached node');
        }

        if (internalNode === this.#tail) {
            throw new Error('Cannot add after tail');
        }

        const newNode = new InternalDoublyLinkedListNode<T>(value, this.#owner);

        const nextConnectedNode = internalNode.getNext();

        newNode.setPrev(internalNode, this.#owner);
        internalNode.setNext(newNode, this.#owner);

        if (nextConnectedNode) {
            newNode.setNext(nextConnectedNode, this.#owner);
            nextConnectedNode.setPrev(newNode, this.#owner);
        }
        
        this.#currentSize += 1;

        return newNode;
    }

    // To allow bi-directional deletions and random access pattern, this function was created.
    // It takes a node and can unlink that specific node from the DLL.
    // It returns a standalone node after removal.
    unlinkNode(node: DoublyLinkedListNode<T>): DoublyLinkedListNode<T> {

        if (this.#tail.getPrev() === this.#head || this.#head.getNext() === this.#tail) {
            throw new Error('Underflow!')
        }

        if (!(node instanceof InternalDoublyLinkedListNode)) {
            throw new Error('Artificial Node detected')
        }
        
        const internalNode = node as InternalDoublyLinkedListNode<T>;

        const canProceed = internalNode.validateOwner(this.#owner);

        if (!canProceed) {
            throw new Error('Node does not belong to this list');
        }

        if (!(internalNode.getPrev() && internalNode.getNext())) {
            throw new Error('Cannot unlink sentinel or detached node');
        }
        
        const nodePrev = internalNode.getPrev();
        const nodeNext = internalNode.getNext();

        if (nodePrev && nodeNext) {
            nodePrev.setNext(nodeNext, this.#owner);
            nodeNext.setPrev(nodePrev, this.#owner);
        }
        
        internalNode.setNext(null, this.#owner);
        internalNode.setPrev(null, this.#owner);

        this.#currentSize -= 1;

        return internalNode as DoublyLinkedListNode<T>;

    }

    pushAfterHead(value: T): DoublyLinkedListNode<T> {
        return this.insertAfter(this.#head, value);
    }

    popAfterHead(): DoublyLinkedListNode<T> {
        return this.unlinkNode(this.#head.getNext()!);
    }

    pushBeforeTail(value: T): DoublyLinkedListNode<T> {
        return this.insertBefore(this.#tail, value);
    }

    popBeforeTail(): DoublyLinkedListNode<T> {
        return this.unlinkNode(this.#tail.getPrev()!);
    }

    peekAfterHead(): DoublyLinkedListNode<T> {
        return this.#head.getNext() as DoublyLinkedListNode<T>;
    }

    peekBeforeTail(): DoublyLinkedListNode<T> {
        return this.#tail.getPrev() as DoublyLinkedListNode<T>;
    }

    getSize(): number {
        return this.#currentSize;
    }

    getOptions(): DoublyLinkedListOptions {
        return this.#options;
    }
    
    clear() {
        this.#head = new InternalDoublyLinkedListNode<T>(null, this.#owner);
        this.#tail = new InternalDoublyLinkedListNode<T>(null, this.#owner);
        this.#head.setNext(this.#tail, this.#owner);
        this.#tail.setPrev(this.#head, this.#owner);
        this.#currentSize = 0;
    }

    *[Symbol.iterator]() {
        if (this.#head.getNext() === this.#tail) {
            return;
        } else {
            for (let node = this.#head.getNext(); node !== this.#tail; node = node?.getNext()!) {
                yield node;
            }
        }
    }
    
    *reverse() {
        if (this.#tail.getPrev() === this.#head) {
            return;
        } else {
            for (let node = this.#tail.getPrev(); node !== this.#head; node = node?.getPrev()!) {
                yield node;
            }
        }
    }
}