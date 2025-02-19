// Space Complexity: 
// Time Complexity: 

class MaxHeap<T> {
    private heap: Array<T>;
    constructor () {
        this.heap = new Array<T>();
    }

    public add(value: T): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    public remove(): T {
        if (!this.heap.length) throw new Error('Underflow');
        //This swap is done, only to be able to remove the pop function, by swapping the element at the index to the last element, pop can now be used.
        this.swap(0, this.heap.length - 1);
        const removedElement = this.heap.pop()!;
        this.bubbleDown();
        return removedElement;
    }

    public peek(): T {
        return this.heap[0];
    }

    private swap(i: number, j: number): void {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    private getParentIndex(index: number): number{
        return Math.floor((index - 1)/2);

        // This can also be written as mentioned below.
        // return Math.ceil(index/2) - 1;
    }

    // This function rebalances the heap to store the largest value at the top.
    private bubbleUp(): void {
        let index: number = this.heap.length - 1;
        let parentIndex: number = this.getParentIndex(index);
        while (index > 0) {
            parentIndex = this.getParentIndex(index);
            if (this.heap[index] < this.heap[parentIndex]) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private bubbleDown(): void {
        let index: number = 0;
        const length = this.heap.length;
        let leftChildIndex: number;
        let rightChildIndex: number;
        let largestIndex: number;

        while(true) {    
            leftChildIndex = (2 * index) + 1;
            rightChildIndex = (2 * index) + 2;
    
            largestIndex = index;

            if (leftChildIndex < length && this.heap[leftChildIndex] > this.heap[largestIndex]) {
                largestIndex = leftChildIndex;
            }

            if (rightChildIndex < length && this.heap[rightChildIndex] > this.heap[largestIndex]) {
                largestIndex = rightChildIndex;
            }

            if (largestIndex === index) break;

            this.swap(index, largestIndex);
            index = largestIndex;
        }        
    }
}