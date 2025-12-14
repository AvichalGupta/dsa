// Space Complexity: 
// Time Complexity: 
export class LinkedListNode<T> {
    private data: T;
    private left: LinkedListNode<T> | null;
    private right: LinkedListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    public setRightChild(val: LinkedListNode<T> | T | null) {
        if (val instanceof LinkedListNode) {
            this.right = val;
        } else if (val) {
            this.right = new LinkedListNode<T>(val);
        }
    }

    public setLeftChild(val: LinkedListNode<T> | T | null) {
        if (val instanceof LinkedListNode) {
            this.left = val;
        } else if (val) {
            this.left = new LinkedListNode<T>(val);
        }
    }

    public getRightChild() {
        return this.right;
    }

    public getLeftChild() {
        return this.left;
    }  

    public getData(): T {
        return this.data;
    }
}