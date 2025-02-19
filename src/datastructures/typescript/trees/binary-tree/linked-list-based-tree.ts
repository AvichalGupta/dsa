// Space Complexity: 
// Time Complexity: 
class LinkedListNode<T> {
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
    private head: LinkedListNode<T> | null;

    constructor() {
        this.head = null;
    }

    public setRightChild(data: T, parentIndex: number): void {
        this.tree[(parentIndex * 2) + 2] = data;
    }

    public setLeftChild(data: T, parentIndex: number): void {
        this.tree[(parentIndex * 2) + 1] = data;
    }

    public getRightChild(parentIndex: number): T | null {
        return this.tree[(parentIndex * 2) + 2];
    }

    public getLeftChild(parentIndex: number): T | null {
        return this.tree[(parentIndex * 2) + 1];
    }

    public getParent(index: number): T | null {
        if (index === 0) return null;
        const parentIndex = Math.floor((index - 1) / 2);
        return this.tree[parentIndex];
    }

    public getRoot(): T | null {
        if (this.isEmpty()) return null;
        return this.head!.data;
    }

    public setRoot(data: T): void {
        this.head!.data = data;
    }

    public size(): number {
        return this.;
    }

    public isEmpty(): boolean {
        return this.size() > 0;
    }

    public printTree(): void {
        if (this.tree.length === 0) {
            console.log('Empty Binary Tree');
        } else {
            let level = 0;
            while (Math.pow(2, level) - 1 < this.tree.length) {
                const start = Math.pow(2, level) - 1;
                const end = Math.min(Math.pow(2, level + 1) - 1, this.tree.length);
                const levelNodes = this.tree.slice(start, end).map(node => node !== null ? node : '_');
                console.log(`Level ${level}: ${levelNodes.join(' ')}`);
                level++;
            }
        }  
    }
}