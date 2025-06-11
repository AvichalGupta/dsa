import { Stack } from "../../../datastructures/typescript/stacks/stack";
import { LinkedListBasedBinaryTree, LinkedListNode } from "../../../datastructures/typescript/trees/binary-tree/linked-list-based-tree";

export function breadthFirstSearch<T>(tree: LinkedListBasedBinaryTree<T>): T[] {
    
    const stack = new Stack<LinkedListNode<T>>();
    stack.push(tree.getRoot());
    const dfsResult = new Array<T>();

    while (!stack.isEmpty()) {
        const node = stack.pop();

        dfsResult.push(node.data);
        
        if (node.left) {
            stack.push(node.left);
        }

        if (node.right) {
            stack.push(node.right);
        }
    }

    return dfsResult;
}