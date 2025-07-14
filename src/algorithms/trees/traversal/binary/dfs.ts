import { Stack } from "../../../../datastructures/typescript/stacks/stack";
import { LinkedListNode } from "../../../../datastructures/typescript/trees/binary-tree/linked-list-based-tree";

export function depthFirstSearch<T>(root: LinkedListNode<T>): T[] {
    
    const stack = new Stack<LinkedListNode<T>>();
    stack.push(root);
    const dfsResult = new Array<T>();
    let tempNode: LinkedListNode<T> | null = null;

    while (!stack.isEmpty()) {
        
        const node = stack.pop();
        dfsResult.push(node.getData());
        
        tempNode = node.getLeftChild();
        if (tempNode) {
            stack.push(tempNode);
        }

        tempNode = node.getRightChild();
        if (tempNode) {
            stack.push(tempNode);
        }
    }

    return dfsResult;
}