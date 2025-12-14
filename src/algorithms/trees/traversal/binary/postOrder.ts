import { Queue } from "../../../../datastructures/queues/queue";
import { LinkedListNode } from "../../../../datastructures/trees/binary-tree/linked-list-based-tree";

export function postOrderTraversal<T>(root: LinkedListNode<T>): T[] {
    
    const queue = new Queue<LinkedListNode<T>>();
    queue.enqueue(root);
    const bfsResult = new Array();

    let tempNode: LinkedListNode<T> | null = null;

    while (!queue.isEmpty()) {
        
        const node = queue.dequeue();
        
        tempNode = node.getLeftChild();
        if (tempNode) {
            queue.enqueue(tempNode);
        }
        
        tempNode = node.getRightChild();
        if (tempNode) {
            queue.enqueue(tempNode);
        }

        bfsResult.push(node.getData());
    }

    return bfsResult;
}