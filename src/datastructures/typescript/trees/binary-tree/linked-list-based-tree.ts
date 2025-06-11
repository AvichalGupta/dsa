// Space Complexity: 
// Time Complexity: 
export class LinkedListNode<T> {
    public data: T;
    public left: LinkedListNode<T> | null;
    public right: LinkedListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class LinkedListBasedBinaryTree<T> {
    private head: LinkedListNode<T>;

    constructor(val: T) {
        this.head = new LinkedListNode(val);
    }

    public getRoot() {
        return this.head;
    }

    public setRoot(val: T) {
        this.head = new LinkedListNode<T>(val);
    }

    public setRightChild(node: LinkedListNode<T>, val: T) {
        node.right = new LinkedListNode<T>(val);
    }

    public setLeftChild(node: LinkedListNode<T>, val: T) {
        node.left = new LinkedListNode<T>(val);
    }

    public getRightChild(node: LinkedListNode<T>) {
        return node.right;
    }

    public getLeftChild(node: LinkedListNode<T>) {
        return node.left;
    }   
}