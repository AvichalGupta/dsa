// Space Complexity: 
// Time Complexity: 
export class ArrayBasedBinaryTree<T> {
    private tree: Array<T>;

    constructor(maxSize = Number.MAX_SAFE_INTEGER) {
        this.tree = new Array(maxSize).fill(null);
    }

    public getData(currentIndex: number): T | null {
        return this.tree[currentIndex];
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
        return this.tree[0];
    }

    public setRoot(data: T): void {
        this.tree[0] = data;
    }

    public size(): number {
        return this.tree.length;
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
                const levelNodes = this.tree.slice(start, end).map(node => node ?? '_');
                console.log(`Level ${level}: ${levelNodes.join(' ')}`);
                level++;
            }
        }  
    }
}