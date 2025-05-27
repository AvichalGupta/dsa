import { Queue } from "../../../datastructures/typescript/queues/queue";

// Space Complexity: O(n(visited array) + n(queue) + n(bfsResult)) = O(n)
// Time Complexity: O(N) + O(2E), queue time comp is O(n), childNodes for loop runs O(2 * number of edges) times. = O(Math.max(N, 2E))
export function breadthFirstSearch(adjacencyList: number[][]) {
    const queue = new Queue<number>();
    const visited = new Array(adjacencyList.length).fill(0);
    const bfsResult = new Array();

    for (let startIndex = 0; startIndex < adjacencyList.length; startIndex++) {
        
        if (visited[startIndex] === 0) {
            queue.enqueue(startIndex);
            visited[startIndex] = 1;
        
            while (!queue.isEmpty()) {
                const currentNode = queue.dequeue();
                visited[currentNode] = 1;
                bfsResult.push(currentNode);
                for (const childNode of adjacencyList[currentNode]) {
                    if (visited[childNode] === 0)
                        queue.enqueue(childNode);
                }
            }
        }
    }

    return bfsResult;
}