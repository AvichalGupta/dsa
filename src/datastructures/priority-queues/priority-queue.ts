// Space Complexity: 
// Time Complexity: 

import { MaxHeap, MinHeap } from "../heaps";

enum PriorityQueueType {
    MIN = 'MIN',
    MAX = 'MAX'
}
export class PriorityQueue<T> {
    private heap: MaxHeap<T> | MinHeap<T>;
    constructor(type: PriorityQueueType) {
        if (type === PriorityQueueType.MAX) {
            this.heap = new MaxHeap<T>();
        } else {
            this.heap = new MinHeap<T>();
        }
    }

    add(node: T): void {
        this.heap.add(node);
    }

    remove(): T {
        return this.heap.remove();
    }

    peek(): T {
        return this.heap.peek();
    }

}