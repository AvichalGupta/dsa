import { breadthFirstSearch } from "../../../algorithms/graphs/traversal/bfs";
import { depthFirstSearch } from "../../../algorithms/graphs/traversal/dfs";
import { Queue } from "../queues/queue";

export class Graph<T> {
    private graph: number[][];

    constructor(adjacencyMatrix: T[][], connectionIndicator: T) {
        this.graph = this.convertToAdjacencyList(adjacencyMatrix, connectionIndicator);
    }

    private convertToAdjacencyList(adjacencyMatrix: T[][], connectionIndicator: T): number[][] {
        const adjacencyList: number[][] = Array.from({ length: adjacencyMatrix.length }, () => []);

        for (let i = 0; i < adjacencyMatrix.length; i++) {
            for (let j = 0; j < adjacencyMatrix[0].length; j++) {
                if (adjacencyMatrix[i][j] === connectionIndicator) {
                    adjacencyList[i].push(j);
                }
            }
        }

        return adjacencyList;
    }

    public BFS() {
        return breadthFirstSearch(this.graph);
    }

    public DFS() {
        return depthFirstSearch(this.graph);
    }

    public detectCycle(directed: boolean = false): boolean {
        let cycleFound = false;
        if (directed) {
            
            const inDegreeMap = new Map<number, number>();
            
            let visited = new Array<number>().fill(0);

            for (let i = 0; i < this.graph.length; i++) {
                for (const childNode of this.graph[i]) {
                    if (inDegreeMap.has(childNode)) {
                        inDegreeMap.set(childNode, (inDegreeMap.get(childNode) || 0) + 1);
                    } else {
                        inDegreeMap.set(childNode, 0);
                    }
                }
            }

            for (let i = 0; i < this.graph.length; i++) {
                const queue = new Queue<number>();
                visited = new Array<number>().fill(0);

                queue.enqueue(i);
                while (!queue.isEmpty()) {
                    const node = queue.dequeue();

                    if (visited[node] === 0) {
                        visited[node] = 1;
                        for (const childNode of this.graph[node]) {
                            queue.enqueue(childNode);
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < this.graph.length; i++) {
                const queue = new Queue<number>();
                const visited = new Array<number>().fill(0);

                const inDegreeMap = new Map<number, number>();

                queue.enqueue(i);
                while (!queue.isEmpty()) {
                    const node = queue.dequeue();

                    if (visited[node] === 0) {
                        visited[node] = 1;
                        for (const childNode of this.graph[node]) {
                            queue.enqueue(childNode);
                        }
                    }
                }
            }
        }

        return cycleFound;
    }

}