// Space Complexity: 
// Time Complexity: 
export class LinkedListNode<T> {
    private data: T;
    private children: LinkedListNode<T>[];

    constructor(data: T) {
        this.data = data;
        this.children = [];
    }

    public setChildren(val: LinkedListNode<T>[] | LinkedListNode<T> | T | null) {
        if (Array.isArray(val)) {
            if (val instanceof LinkedListNode) {
                this.children = val;
            }
        } else if (val instanceof LinkedListNode) {
            this.children.push(val);
        } else if (val) {
            this.children.push(new LinkedListNode<T>(val));
        }
    }

    public getChildren() {
        return this.children;
    } 

    public getData(): T {
        return this.data;
    }
}