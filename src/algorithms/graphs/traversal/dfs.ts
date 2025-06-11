import { Stack } from "../../../datastructures/typescript/stacks/stack";

// Space Complexity: O(n(visited array) + n(queue) + n(bfsResult)) = O(n)
// Time Complexity: O(N) + O(2E), queue time comp is O(n), childNodes for loop runs O(2 * number of edges) times. = O(Math.max(N, 2E))
export function depthFirstSearch(adjacencyList: number[][]) {  
    
    const stack = new Stack<number>()
    const visited = new Array(adjacencyList.length).fill(0);
    const dfsResult = new Array();

    for (let startIndex = 0; startIndex < adjacencyList.length; startIndex++) {
        
        if (visited[startIndex] === 0) {
            stack.push(startIndex);
            visited[startIndex] = 1;
            
            while (!stack.isEmpty()) {
                
                const currentNode = stack.pop();
                
                if (currentNode !== undefined) {
                    dfsResult.push(currentNode);
                    // maintains the left-to-rigth order, if array is 0 to n, chilren are read in right-to-left order.
                    for (let idx = adjacencyList[currentNode].length - 1; idx >= 0; idx--) {
                        const childNode = adjacencyList[currentNode][idx];
                        if (visited[childNode] === 0) {
                            stack.push(childNode);
                            visited[childNode] = 1;
                        }
                    }
                }
            }
        }
    }

    return dfsResult;
}