import { breadthFirstSearch } from "../../algorithms/graphs/traversal/bfs";
import { depthFirstSearch } from "../../algorithms/graphs/traversal/dfs";

type GraphInput<T> = {
    adjacencyMatrix?: T[][];
    edges: number[][];
}

export class Graph<T> {
    private graph: Map<number, number[]>;

    constructor(input: GraphInput<T>, connectionIndicator?: T) {
        this.graph = this.convertToAdjacencyList(input, connectionIndicator);
    }

    private convertToAdjacencyList(input: GraphInput<T>, connectionIndicator?: T): Map<number, number[]> {

        const adjacencyList: Map<number, number[]> = new Map<number, number[]>();
        if (input.adjacencyMatrix) {
            if (!connectionIndicator) {
                throw new Error('Please provide connection indicator!');
            }
            for (let i = 0; i < input.adjacencyMatrix.length; i++) {
                for (let j = 0; j < input.adjacencyMatrix[0].length; j++) {
                    if (input.adjacencyMatrix[i][j] === connectionIndicator) {
                        adjacencyList.set(i, [...(adjacencyList.get(i) ?? []), j]);
                        adjacencyList.set(j, [...(adjacencyList.get(j) ?? []), i]);
                    }
                }
            }
        } else if (input.edges) {
            for (const [u, v] of input.edges) {
                 adjacencyList.set(u, [...(adjacencyList.get(u) ?? []), v]);
                adjacencyList.set(v, [...(adjacencyList.get(v) ?? []), u]);
            }
        } else {
            throw new Error('Please provide either adjacency matrix or edges array to create graph!');
        }
        return adjacencyList;
    }

    public BFS() {
        return breadthFirstSearch(this.graph);
    }

    public DFS() {
        return depthFirstSearch(this.graph);
    }

    public detectCycle() {
    }

}