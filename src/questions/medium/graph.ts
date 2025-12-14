import { Stack } from "../../datastructures/stacks/stack";
import { execute } from "../helper";

// 2467. Most Profitable Path in a Tree
// Time Complexity: O(n)
// Space Complexity: O(n^2)

function mostProfitablePath(edges: number[][], bob: number, amount: number[]): number {
    const adjacencyList: number[][] = Array.from({ length: edges.length + 1 }, () => []);

    for (const [u, v] of edges) {
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    const parentList: number[] = new Array(edges.length + 1).fill(-1);
    const depth: number[] = new Array(edges.length + 1).fill(0);

    let queue = [0];
    let iter = 0;
    let parent;

    // Handle Alice Movement, store parents for bob traversal, store depth for max profit calculation
    while (iter < edges.length + 1) {
        parent = queue[iter];
        for (const neighbour of adjacencyList[parent]) {
            if (neighbour !== 0 && parentList[neighbour] === -1) {
                parentList[neighbour] = parent;
                depth[neighbour] = depth[parent] + 1;
                queue.push(neighbour);
            }
        }
        iter++;
    }

    let bobDepth = 0;
    let currNode = bob;

    while (true) {   
        if (currNode === 0) break;
        
        if (bobDepth === depth[currNode]) amount[currNode] = amount[currNode] / 2;
        else if (bobDepth < depth[currNode]) amount[currNode] = 0;
        
        currNode = parentList[currNode];
        bobDepth++;
    }

    let stack = new Stack<number>();
    let maxProfit = -Infinity;
    let profitArr = new Array(amount.length + 1).fill(0);
    profitArr[0] = amount[0];
    let visited = new Array(edges.length + 1).fill(0);

    while (!stack.isEmpty()) {
        currNode = stack.pop();

        if (currNode !== 0 && adjacencyList[currNode].length === 1) {
            if (maxProfit < profitArr[currNode]) {
                maxProfit = profitArr[currNode];
            }
        }

        for (const neighbour of adjacencyList[currNode]) {
            if (visited[neighbour] === 0) {
                profitArr[neighbour] = profitArr[currNode] + amount[neighbour];
                visited[neighbour] = 1;
                stack.push(neighbour);
            }
        }

    }

    return maxProfit;
    
}

// execute([[0,1],[1,2],[1,3],[3,4]], 3, [-2,4,2,-4,6], mostProfitablePath);

function connectedComponents(edges: number[][]): number {

    const adjacencyList: Map<number, number[]> = new Map<number, number[]>();

    for (const [u, v] of edges) {
        adjacencyList.set(u, [ ...adjacencyList.get(u) ?? [], v]);
        adjacencyList.set(v, [ ...adjacencyList.get(v) ?? [], u]);
    }

    const visited: Set<number> = new Set<number>();

    const stack: Stack<number> = new Stack<number>();
    let tempVal: number = 0;
    let componentsCount = 0;

    for (const key of adjacencyList.keys()) {
        
        if (!visited.has(key)) {
            componentsCount++;
        }
        
        stack.push(key);
        
        while (!stack.isEmpty()) {
            tempVal = stack.pop();
    
            if (!visited.has(tempVal)) {
                visited.add(tempVal);
                
                for (const childNode of adjacencyList.get(tempVal) ?? []) {
                    stack.push(childNode);
                }
            }
        }
    }
    
    return componentsCount;
}

execute([[0,1],[0,2],[0,3],[4,5]], connectedComponents);