// Space Complexity: 
// Time Complexity: 

enum PriorityQueueType {
    MIN = 'MIN',
    MAX = 'MAX'
}
class PriorityQueue<T> {
    private heap: MaxHeap<T> | MinHeap<T>;
    constructor(type: PriorityQueueType) {
        if (type === PriorityQueueType.MIN) {
            this.heap = new MinHeap<T>();
        } else if (type === PriorityQueueType.MAX) {
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