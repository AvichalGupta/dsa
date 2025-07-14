import { Queue } from "../../datastructures/typescript/queues/queue";
import { Stack } from "../../datastructures/typescript/stacks/stack";
import { LinkedListNode } from "../../datastructures/typescript/trees/binary-tree/linked-list-based-tree";
import { LinkedListNode as NaryNode }from "../../datastructures/typescript/trees/n-ary-tree/linked-list-based-tree";
import { executeNaryTree, executeTree, executeTreeFromEdges, executeNaryTreeFromEdges } from "../helper";

// Inverting a binary tree.
function invertBinaryTree(root: LinkedListNode<number>): LinkedListNode<number> {
    
    function bfs(): LinkedListNode<number> {
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

    function dfs(): LinkedListNode<number> {
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

    return bfs();
}

// executeTree([4,2,7,1,3,6,9], invertBinaryTree);
// executeTreeFromEdges([[4,2],[4,7],[2,1],[2,3],[7,6],[7,9]], invertBinaryTree);

// Binary Tree PreOrder Traversal
function binaryTreePreOrder(root: LinkedListNode<number>): number[] {
    const preOrderRes: number[] = [];
    const queue = new Queue<LinkedListNode<number>>();
    queue.enqueue(root);
    
    let tempNode: LinkedListNode<number> | null = null;
   
    while (!queue.isEmpty()) {
        const node = queue.dequeue();

        preOrderRes.push(node.getData());

        tempNode = node.getLeftChild();
        if (tempNode) {
            queue.enqueue(tempNode);
        }

        tempNode = node.getRightChild();
        if (tempNode) {
            queue.enqueue(tempNode)
        }
    }

    return preOrderRes;
}

// executeTree([4,2,7,1,3,6,9], binaryTreePreOrder);
// executeTreeFromEdges([[4,2],[4,7],[2,1],[2,3],[7,6],[7,9]], binaryTreePreOrder);

function cloneNAryTree(root: NaryNode<number>): NaryNode<number> {
    const queue = new Queue<[NaryNode<number>, NaryNode<number>]>();
    const clone: NaryNode<number> = new NaryNode<number>(root.getData());
    queue.enqueue([root, clone]);
    
    let tempNode: [NaryNode<number>, NaryNode<number>] | null = null;

    while (!queue.isEmpty()) {
        tempNode = queue.dequeue();

        for (const childNode of tempNode[0].getChildren()) {
            const clonedNode = new NaryNode<number>(childNode.getData());
            tempNode[1].setChildren(clonedNode);
            queue.enqueue([childNode, clonedNode]);
        }
    }
    return clone;
}

// executeNaryTree([[1],[3,4,5],[6,7]], cloneNAryTree);
// executeNaryTreeFromEdges([[1,3],[1,4],[1,5],[3,6],[3,7]], cloneNAryTree);

function maxHeightOfTree(root: LinkedListNode<number>): number {
    
    if (!root) return 0;
    const stack: Stack<[LinkedListNode<number>, number]> = new Stack<[LinkedListNode<number>, number]>();
    stack.push([root, 0]);

    let tempNode: [LinkedListNode<number>, number] | null = null;
    let tempChildNode: LinkedListNode<number> | null = null;
    let maxDepth = 0;

    while (!stack.isEmpty()) {
        tempNode = stack.pop();

        if (tempNode[1] > maxDepth) {
            maxDepth = tempNode[1];
        }

        tempChildNode = tempNode[0].getLeftChild();
        
        if (tempChildNode) {
            stack.push([tempChildNode, tempNode[1] + 1])
        }

        tempChildNode = tempNode[0].getRightChild();

        if (tempChildNode) {
            stack.push([tempChildNode, tempNode[1] + 1])
        }
    }

    return maxDepth;
}

// executeTree([4,2,7,1,3,6,9,5,8], maxHeightOfTree);
// executeTreeFromEdges([[4,2],[4,7],[2,1],[2,3],[7,6],[7,9],[5,8],[5,9]], maxHeightOfTree);

// Follow up Question: Time Complexity should be O(log(n)) for a complete Binary Tree
function countCompleteTreeNodes(root: LinkedListNode<number>): number {
    function bfs(): number {
        
        const stack: Stack<LinkedListNode<number>> = new Stack<LinkedListNode<number>>();
        stack.push(root);

        let tempNode: LinkedListNode<number> | null = null;
        let tempChildNode: LinkedListNode<number> | null = null;
        let nodesCount = 0;

        while (!stack.isEmpty()) {
            tempNode = stack.pop();

            nodesCount += 1;

            tempChildNode = tempNode.getLeftChild();
            if (tempChildNode) {
                stack.push(tempChildNode);
            }

            tempChildNode = tempNode.getRightChild();
            if (tempChildNode) {
                stack.push(tempChildNode);
            }
        }

        return nodesCount;
    }

    // follow up question
    function binarySearchOnCompleteBinaryTree(): number {
        function recurse(node: LinkedListNode<number> | null): number {
            if (!node) return 0;
            return 1 + recurse(node.getLeftChild()) + recurse(node.getRightChild());
        }
        return recurse(root);
    }

    return bfs();
}

// executeTree([4,2,7,1,3,6,9,5,8], countCompleteTreeNodes);
// executeTreeFromEdges([[4,2],[4,7],[2,1],[2,3],[7,6],[7,9],[5,8],[5,9]], countCompleteTreeNodes);