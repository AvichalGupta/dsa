import { breadthFirstSearch } from "../algorithms/trees/traversal/binary/bfs";
import { breadthFirstSearch as nAryBFS } from "../algorithms/trees/traversal/n-ary/bfs";
import { Queue } from "../datastructures/typescript/queues/queue";
import { LinkedListNode } from "../datastructures/typescript/trees/binary-tree/linked-list-based-tree";
import { LinkedListNode as NaryNode } from "../datastructures/typescript/trees/n-ary-tree/linked-list-based-tree";

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
    if (output instanceof LinkedListNode) {
        console.log('\n\x1b[32;1m output: \x1b[0m', breadthFirstSearch(output as LinkedListNode<number>));
    } else {
        console.log('\n\x1b[32;1m output: \x1b[0m', output);
    }
    console.log('\n\x1b[31;1m Total Memory Used: \x1b[0m', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB\n\n');
}

export function createBinaryTree(array: number[]): LinkedListNode<number> {
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

export function executeTreeFromEdges(...args: any[]) {
    const fn = args.pop();
    const treeArray = args[0];
    const directed = args[1] || false;
    delete args[1];
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
    args[0] = createBinaryTreeFromEdges(treeArray, directed);
    const output = fn(...args);
    args[0] = treeArray;
    console.timeEnd('\n\x1b[31;1m Time Taken: \x1b[0m');
    const finalMemory = process.memoryUsage().heapUsed;
    console.log('\n\x1b[32;1m input: \x1b[0m', ...args);
    if (output instanceof LinkedListNode) {
        console.log('\n\x1b[32;1m output: \x1b[0m', breadthFirstSearch(output as LinkedListNode<number>));
    } else {
        console.log('\n\x1b[32;1m output: \x1b[0m', output);
    }
    console.log('\n\x1b[31;1m Total Memory Used: \x1b[0m', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB\n\n');
}

export function createBinaryTreeFromEdges(edgesArray: number[][], directed = false): LinkedListNode<number> {
    const adjacencyList: Map<number, number[]> = new Map<number, number[]>();

    for (const [u, v] of edgesArray) {
        adjacencyList.set(u, [...(adjacencyList.get(u) ?? []), v]);
        if (!directed) {
            adjacencyList.set(v, [...(adjacencyList.get(v) ?? []), u]);
        }
    }

    const bfsResult: number[] = [];
    const visited: Set<number> = new Set<number>();

    const queue: Queue<number> = new Queue<number>();
    queue.enqueue(edgesArray[0][0]);
    let tempNode: number = 0;

    while (!queue.isEmpty()) {
        tempNode = queue.dequeue();

        if (!visited.has(tempNode)) {
            visited.add(tempNode);
            bfsResult.push(tempNode);
            for (const childNode of (adjacencyList.get(tempNode) ?? [])) {
                queue.enqueue(childNode);
            }
        }
    }

    return createBinaryTree(bfsResult);
}

export function executeNaryTree(...args: any[]) {
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
    args[0] = createNaryTree(treeArray);
    const output = fn(...args);
    args[0] = treeArray;
    console.timeEnd('\n\x1b[31;1m Time Taken: \x1b[0m');
    const finalMemory = process.memoryUsage().heapUsed;
    console.log('\n\x1b[32;1m input: \x1b[0m', ...args);
    if (output instanceof NaryNode) {
        console.log('\n\x1b[32;1m output: \x1b[0m', nAryBFS(output as NaryNode<number>));
    } else {
        console.log('\n\x1b[32;1m output: \x1b[0m', output);
    }
    console.log('\n\x1b[31;1m Total Memory Used: \x1b[0m', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB\n\n');
}

export function createNaryTree(nodes: number[][]): NaryNode<number> {
    const nAryTree: NaryNode<number> = new NaryNode<number>(nodes[0][0]);
    const queue: Queue<[NaryNode<number>, number]> = new Queue<[NaryNode<number>, number]>();
    queue.enqueue([nAryTree, 1]);
    let tempNode: [NaryNode<number>, number] | null = null;
    let parentNode: NaryNode<number> | null = null;
    let parentChildCount = 0;

    while (!queue.isEmpty()) {
        tempNode = queue.dequeue();
        parentNode = tempNode[0];

        if (tempNode[1] < nodes.length && parentChildCount < nodes.length) {
            for (const idx in nodes[tempNode[1]]) {
                const childNode = new NaryNode<number>(nodes[tempNode[1]][+idx]);
                parentNode.setChildren(childNode);
                queue.enqueue([childNode, tempNode[1] + nodes[parentChildCount].length + +idx]);
            }
            parentChildCount++;
        }
    }

    return nAryTree;
}

export function executeNaryTreeFromEdges(...args: any[]) {
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
    args[0] = createNaryTreeFromEdges(treeArray);
    const output = fn(...args);
    args[0] = treeArray;
    console.timeEnd('\n\x1b[31;1m Time Taken: \x1b[0m');
    const finalMemory = process.memoryUsage().heapUsed;
    console.log('\n\x1b[32;1m input: \x1b[0m', ...args);
    if (output instanceof NaryNode) {
        console.log('\n\x1b[32;1m output: \x1b[0m', nAryBFS(output as NaryNode<number>));
    } else {
        console.log('\n\x1b[32;1m output: \x1b[0m', output);
    }
    console.log('\n\x1b[31;1m Total Memory Used: \x1b[0m', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB\n\n');
}

export function createNaryTreeFromEdges(edgesArray: number[][]): NaryNode<number> {
    const adjacencyList: Map<number, number[]> = new Map<number, number[]>();

    for (const [u, v] of edgesArray) {
        adjacencyList.set(u, [...(adjacencyList.get(u) ?? []), v]);
    }

    return createNaryTree([ [edgesArray[0][0]], ...Array.from(adjacencyList.values())]);
}