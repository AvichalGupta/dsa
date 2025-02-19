// Space Complexity: 
// Time Complexity: 
import { SinglyLinkedList } from '../linked-lists/singly-linked-list';

export class SinglyLinkedListStack<T> {
    private singlyLinkedList: SinglyLinkedList<T>;

    constructor (maxSize?: number) {
        this.singlyLinkedList = new SinglyLinkedList(maxSize);
    }

    public push(data: T): void {
        this.singlyLinkedList.append(data, 0);
    }

    public pop(): T {
        return this.singlyLinkedList.remove(0);
    }

    public peek(): T {
        return this.singlyLinkedList.peek(0);
    }

    public print(): void {
        return this.singlyLinkedList.print();
    }
 
    public size(): number {
        return this.singlyLinkedList.size();
    }

    public isEmpty(): boolean {
        return this.singlyLinkedList.isEmpty();
    }

    public isFull(): boolean {
        return this.singlyLinkedList.isFull();
    }

    public flush(): void {
        this.singlyLinkedList.clear();
    } 

    *[Symbol.iterator]() {
        this.singlyLinkedList[Symbol.iterator]()
    }
}