export class TreeNode<T> {
    value: T;
    right: TreeNode<T> | null;
    left: TreeNode<T> | null;
    constructor(value:T) {
        this.value = value
        this.left = null;
        this.right = null;
    }
}

export class BinarySearchTree<T> {
    bst: TreeNode<T> | null;
    constructor() {
        this.bst = null;
    }

    public insert(value: T): boolean {
        if (!this.bst) {
            this.bst = new TreeNode<T>(value);
            return true;
        }

        let tempNode = this.bst;

        while(tempNode) {
            
            if (value === tempNode.value) return false;

            if (value < tempNode.value) {
                if (tempNode.left) {
                    tempNode = tempNode.left;
                } else {
                    tempNode.left = new TreeNode<T>(value);
                    break;
                }
            } else {
                if (tempNode.right) {
                    tempNode = tempNode.right;
                } else {
                    tempNode.right = new TreeNode<T>(value);
                    break;
                }
            }
        }

        return true;
    }

    public search(value: T): boolean {
        if (!this.bst) return false;

        let tempNode = this.bst;

        while (tempNode) {
            
            if (tempNode.value === value) return true;

            if (value < tempNode.value) {
                if (tempNode.left) {
                    tempNode = tempNode.left;
                } else {
                    return false;
                }
            } else {
                if (tempNode.right) {
                    tempNode = tempNode.right;
                } else {
                    return false;
                }
            }
        } 
        return false;
    }

    public delete(value: T): boolean {
        if (!this.bst) return false;

        let tempNode = this.bst;

        let parent: TreeNode<T> = this.bst;
        let deleteRight: boolean = true;

        while (tempNode) {
            
            if (tempNode.value === value) {
                if (deleteRight) {
                    parent.right = null;
                } else {
                    parent.left = null;
                }
                break;
            }

            if (value < tempNode.value) {
                if (tempNode.left) {
                    parent = tempNode;
                    tempNode = tempNode.left;
                    deleteRight = false;
                } else {
                    return false;
                }
            } else {
                if (tempNode.right) {
                    parent = tempNode;
                    tempNode = tempNode.right;
                    deleteRight = true;
                } else {
                    return false;
                }
            }
        } 

        return true;
    }


    public getHeight(): number {
        if (!this.bst) return -1;

        let height = -1;

        let queue = [this.bst];

        while (queue.length) {
            height++;
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift();
                if (node) {
                    if (node.right) {
                        queue.push(node.right);
                    }
                    if (node.left) {
                        queue.push(node.left);
                    }
                }
            }
        }

        return height;
    }
}