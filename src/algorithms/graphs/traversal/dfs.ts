import { Stack } from "../../../datastructures/typescript/stacks/stack";

// Space Complexity: O(n(visited array) + n(queue) + n(bfsResult)) = O(n)
// Time Complexity: O(N) + O(2E), queue time comp is O(n), childNodes for loop runs O(2 * number of edges) times. = O(Math.max(N, 2E))
export function depthFirstSearch(adjacencyList: Map<number, number[]>): number[] {  
    
    const stack = new Stack<number>()
    const visited = new Set();
    const dfsResult = new Array();

    for (const key of adjacencyList.keys()) {
        
        stack.push(key);
        visited.add(key)
        
        while (!stack.isEmpty()) {
            
            const currentNode = stack.pop();
            
            if (currentNode !== undefined) {
                dfsResult.push(currentNode);
                // maintains the left-to-rigth order, if array is 0 to n, chilren are read in right-to-left order.
                const childNodes = adjacencyList.get(currentNode) ?? [];
                for (let idx = childNodes.length - 1; idx >= 0; idx--) {
                    const childNode = childNodes[idx];
                    if (!visited.has(childNode)) {
                        stack.push(childNode);
                        visited.has(childNode);
                    }
                }
            }
        }
    }

    return dfsResult;
}