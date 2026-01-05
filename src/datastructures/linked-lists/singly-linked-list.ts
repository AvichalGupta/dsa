import { MAX_SIZE } from "../../constants/external";
import { generateOwner } from "../../constants/internal";
import { DoublyLinkedListOptions } from "./doubly-linked-list";

// Space Complexity: 
// Time Complexity: 
// This interface is exported to allow users to set types in their code explicitly if needed.
export interface SinglyLinkedListNode<T> {
    readonly data: T | null;
    getNext(): SinglyLinkedListNode<T> | null;
}

// This class is hidden to avoid new nodes being created outside the scope of the SLL. 
// Nodes can only be created by the SLL and it's methods.
class InternalSinglyLinkedListNode<T> implements SinglyLinkedListNode<T> {
    public data: T | null;
    #next: InternalSinglyLinkedListNode<T> | null = null;
    #owner: symbol;

    constructor(data: T | null, owner: symbol) {
        this.data = data;
        this.#owner = owner;
    }

    getNext(): InternalSinglyLinkedListNode<T> | null {
        return this.#next;
    }

    setNext(node: InternalSinglyLinkedListNode<T> | null, owner: symbol): InternalSinglyLinkedListNode<T> {
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

export type SinglyLinkedListOptions = {
    maxSize: number;
}

export class SinglyLinkedList<T> {
    #head: InternalSinglyLinkedListNode<T>;
    #options: SinglyLinkedListOptions;
    #currentSize: number;
    #owner: symbol;

    constructor(ops?: SinglyLinkedListOptions) {
        if (ops?.maxSize && ops?.maxSize <= 0) throw new Error('Max size must be greater than 0')
        
        this.#owner = generateOwner("SLL_OWNER");
        this.#head = new InternalSinglyLinkedListNode<T>(null, this.#owner);
        this.#head.setNext(null, this.#owner);
        this.#options = {
            maxSize: ops?.maxSize ?? MAX_SIZE
        };
        this.#currentSize = 0;
    }

    // Since SLL are unidirectional, this function was created to allow random access insertion in SLL.
    // The parentNode must be passed to allow addition after given node.
    insertAfterNode(parentNode: SinglyLinkedListNode<T>, value: T | null): SinglyLinkedListNode<T> {
        
        if (this.#currentSize >= this.#options.maxSize) {
            throw new Error('Overflow!')
        }
        
        const internalNode = parentNode as InternalSinglyLinkedListNode<T>;

        const canProceed = internalNode.validateOwner(this.#owner);

        if (!canProceed) {
            throw new Error('Node does not belong to this list');
        }

        const newNode = new InternalSinglyLinkedListNode<T>(value, this.#owner);

        const nextConnectedNode = internalNode.getNext();
        internalNode.setNext(newNode, this.#owner);

        newNode.setNext(nextConnectedNode, this.#owner);
        
        this.#currentSize += 1;

        return newNode;
    }

    // Since SLL are unidirectional, this function was created to allow random access deletion in SLL.
    // The parentNode must be passed to allow deletion after given node.
    // This is by design, if this function were to unlink the parentNode itself, it must have access to it's prev element. 
    // This makes it a DLL, hence stuck with this pattern.
    unlinkAfterNode(parentNode: SinglyLinkedListNode<T>): SinglyLinkedListNode<T> {

        if (this.#head.getNext() === null) {
            throw new Error('Underflow!')
        }
        
        const internalNode = parentNode as InternalSinglyLinkedListNode<T>;

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

        return nodeNext as SinglyLinkedListNode<T>;

    }

    pushAfterHead(value: T): SinglyLinkedListNode<T> {
        return this.insertAfterNode(this.#head, value);
    }

    popAfterHead(): SinglyLinkedListNode<T> {
        return this.unlinkAfterNode(this.#head.getNext()!);
    }

    peekAfterHead(): SinglyLinkedListNode<T> {
        return this.#head.getNext() as SinglyLinkedListNode<T>;
    }

    getSize(): number {
        return this.#currentSize;
    }

    getOptions(): DoublyLinkedListOptions {
        return this.#options;
    }
    
    clear() {
        this.#head = new InternalSinglyLinkedListNode<T>(null, this.#owner);
        this.#head.setNext(null, this.#owner);
        this.#currentSize = 0;
    }

    *[Symbol.iterator]() {
        if (this.#head.getNext() === null) {
            yield null;
        } else {
            for (let node = this.#head.getNext(); node !== null; node = node?.getNext()!) {
                yield node;
            }
        }
    }
    
    *reverse() {
        if (this.#head.getNext() === null) {
            yield null;
        } else {
            let newHead: InternalSinglyLinkedListNode<T> | null = null;
            for (let node = this.#head.getNext(); node !== null; node = node?.getNext()!) {
                const newNode = new InternalSinglyLinkedListNode<T>(node.data, this.#owner);
                newNode.setNext(newHead, this.#owner);
                newHead = newNode;
            }

            for (let node = newHead; node !== null; node = node?.getNext()) {
                yield node;
            }
        }
    }
}