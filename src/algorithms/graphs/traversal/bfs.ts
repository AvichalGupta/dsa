import { Queue } from "../../../datastructures/typescript/queues/queue";

// Space Complexity: O(n(visited array) + n(queue) + n(bfsResult)) = O(n)
// Time Complexity: O(N) + O(2E), queue time comp is O(n), childNodes for loop runs O(2 * number of edges) times. = O(Math.max(N, 2E))
export function breadthFirstSearch(adjacencyList: Map<number, number[]>): number[] {
    const queue = new Queue<number>();
    const visited = new Set();
    const bfsResult = new Array();

    for (const key of adjacencyList.keys()) {
        
        queue.enqueue(key);
        visited.add(key);
    
        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            visited.add(currentNode);
            bfsResult.push(currentNode);
            for (const childNode of (adjacencyList.get(currentNode) ?? [])) {
                if (!visited.has(childNode))
                    queue.enqueue(childNode);
            }
        }
    }

    return bfsResult;
}