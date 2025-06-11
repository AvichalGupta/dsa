import { Queue } from "../../../datastructures/typescript/queues/queue";
import { LinkedListBasedBinaryTree, LinkedListNode } from "../../../datastructures/typescript/trees/binary-tree/linked-list-based-tree";

export function breadthFirstSearch<T>(tree: LinkedListBasedBinaryTree<T>): T[] {
    
    const queue = new Queue<LinkedListNode<T>>();
    queue.enqueue(tree.getRoot());
    const bfsResult = new Array();

    while (!queue.isEmpty()) {
        const node = queue.dequeue();

        bfsResult.push(node.data);
        
        if (node.left) {
            queue.enqueue(node.left);
        }

        if (node.right) {
            queue.enqueue(node.right);
        }
    }

    return bfsResult;
}