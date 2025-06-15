import { breadthFirstSearch } from "../algorithms/trees/traversal/bfs";
import { Queue } from "../datastructures/typescript/queues/queue";
import { LinkedListNode } from "../datastructures/typescript/trees/binary-tree/linked-list-based-tree";

export function execute(...args: any[]) {
    const fn = args.pop();
    if (typeof fn !== 'function') {
        console.error('\nLast argument must be a function\n');
        process.exit(1);
    } else if (args.length < fn.length) {
        console.error('\nFunction \x1b[96;1m' + fn.name + '\x1b[0m expects \x1b[32;1m' + fn.length + '\x1b[0m arguments, but received only \x1b[31;1m' + args.length + '\x1b[0m\n');
        process.exit(1);
    }
    const initMemory = process.memoryUsage().heapUsed;
    console.log('\n\nExecuting Function \x1b[96;1m' + fn.name + '\x1b[0m');
    console.time('\n\x1b[31;1m Time Taken: \x1b[0m');
    const output = fn(...args);
    console.timeEnd('\n\x1b[31;1m Time Taken: \x1b[0m');
    const finalMemory = process.memoryUsage().heapUsed;
    console.log('\n\x1b[32;1m input: \x1b[0m', ...args);
    console.log('\n\x1b[32;1m output: \x1b[0m', output);
    console.log('\n\x1b[31;1m Total Memory Used: \x1b[0m', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB\n\n');
}

export function executeTree(...args: any[]) {
    const fn = args.pop();
    const treeArray = args[0];
    if (typeof fn !== 'function') {
        console.error('\nLast argument must be a function\n');
        process.exit(1);
    } else if (args.length < fn.length) {
        console.error('\nFunction \x1b[96;1m' + fn.name + '\x1b[0m expects \x1b[32;1m' + fn.length + '\x1b[0m arguments, but received only \x1b[31;1m' + args.length + '\x1b[0m\n');
        process.exit(1);
    }
    const initMemory = process.memoryUsage().heapUsed;
    console.log('\n\nExecuting Function \x1b[96;1m' + fn.name + '\x1b[0m');
    console.time('\n\x1b[31;1m Time Taken: \x1b[0m');
    args[0] = createBinaryTree(treeArray);
    const output = fn(...args);
    args[0] = treeArray;
    console.timeEnd('\n\x1b[31;1m Time Taken: \x1b[0m');
    const finalMemory = process.memoryUsage().heapUsed;
    console.log('\n\x1b[32;1m input: \x1b[0m', ...args);
    console.log('\n\x1b[32;1m output: \x1b[0m', breadthFirstSearch(output));
    console.log('\n\x1b[31;1m Total Memory Used: \x1b[0m', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB\n\n');
}

export function createBinaryTree(array: number[]) {
    const visited = new Array(array.length).fill(0);
    const bTreeRoot = new LinkedListNode<number>(array[0]);
    const queue = new Queue<[LinkedListNode<number>, number]>();
    queue.enqueue([bTreeRoot, 0]);
    
    while (!queue.isEmpty()) {
            
        const [node, parentIndex] = queue.dequeue();
        
        if (visited[parentIndex] === 0) {
            
            visited[parentIndex] = 1;
            
            if (2 * parentIndex + 1 < array.length) {
                node.setLeftChild(array[2 * parentIndex + 1]);
                queue.enqueue([node.getLeftChild()!, 2 * parentIndex + 1]);
            }

            if (2 * parentIndex + 2 < array.length) {
                node.setRightChild(array[2 * parentIndex + 2]);
                queue.enqueue([node.getRightChild()!, 2 * parentIndex + 2]);
            }

        }
    }

    for (let idx in visited) {
        if (visited[idx] === 0) throw new Error('Invalid Binary Tree, un-connected node found at index ' + idx.toString());
    }
    
    return bTreeRoot;
}