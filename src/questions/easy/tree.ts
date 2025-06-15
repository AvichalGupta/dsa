import { Queue } from "../../datastructures/typescript/queues/queue";
import { Stack } from "../../datastructures/typescript/stacks/stack";
import { LinkedListNode } from "../../datastructures/typescript/trees/binary-tree/linked-list-based-tree";
import { executeTree } from "../helper";

// Inverting a binary tree.
function invertBinaryTree(root: LinkedListNode<number>) {
    
    function bfs() {
        const queue = new Queue<LinkedListNode<number>>();
        queue.enqueue(root);
        let node = null;
        let tempNode = null;
    
        while (!queue.isEmpty()) {
            node = queue.dequeue();
    
            tempNode = node.getLeftChild();
            node.setLeftChild(node.getRightChild());
            node.setRightChild(tempNode);
            
            tempNode = node.getLeftChild();
            if (tempNode) {
                queue.enqueue(tempNode);
            }
    
            tempNode = node.getRightChild();
            if (tempNode) {
                queue.enqueue(tempNode);
            }
        }
        
        return root;
    }

    function dfs() {
        const stack = new Stack<LinkedListNode<number>>();
        stack.push(root);
        let node = null;
        let tempNode = null;

        while (!stack.isEmpty()) {
            node = stack.pop();

            tempNode = node.getLeftChild();
            node.setLeftChild(node.getRightChild());
            node.setRightChild(tempNode);
    
            tempNode = node.getLeftChild();
            if (tempNode) {
                stack.push(tempNode);
            }
    
            tempNode = node.getRightChild();
            if (tempNode) {
                stack.push(tempNode);
            }
        }

        return root;
        
    }

    return dfs();
}

executeTree([4,2,7,1,3,6,9], invertBinaryTree);