import { Queue } from "../../../../datastructures/queues/queue";
import { LinkedListNode } from "../../../../datastructures/trees/n-ary-tree/linked-list-based-tree";

export function breadthFirstSearch<T>(root: LinkedListNode<T>): T[][] {    
    const queue = new Queue<LinkedListNode<T>>();
    queue.enqueue(root);
    const bfsResult: T[][] = [[root.getData()]];

    while (!queue.isEmpty()) {
       
        const node = queue.dequeue();

        const tempArr = [];
        
        for (const child of node.getChildren()) {
            queue.enqueue(child);
            tempArr.push(child.getData());
        }

        if (tempArr.length) {
            bfsResult.push(tempArr);
        }
    }

    return bfsResult;
}