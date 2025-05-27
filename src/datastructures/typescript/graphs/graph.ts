import { breadthFirstSearch } from "../../../algorithms/trees/traversal/bfs";
import { depthFirstSearch } from "../../../algorithms/trees/traversal/dfs";

export class Graph {
    private graph: number[][];
    private isAdjacencyMatrix: boolean;

    constructor(adjacencyMatrix: number[][]) {
        this.graph = this.convertToAdjacencyList(adjacencyMatrix);
        this.isAdjacencyMatrix = false;
    }

    private convertToAdjacencyList(adjacencyMatrix: number[][]): number[][] {
        const adjacencyList: number[][] = new Array(adjacencyMatrix.length).fill([]);

        for (let i = 0; i < adjacencyMatrix.length; i++) {
            for (let j = 0; j < adjacencyMatrix[0].length; j++) {
                if (adjacencyMatrix[i][j] === 1) {
                    adjacencyList[i].push(j);
                }
            }
        }

        this.isAdjacencyMatrix = false;

        return adjacencyList;
    }

    public convertToAdjacencyMatrix() {
        const adjacencyList = this.graph;
        const adjacencyMatrix = this.graph;

        for (let i = 0; i < adjacencyList.length; i++) {
            for (let j = 0; j < adjacencyList[i].length; j++) {
                adjacencyMatrix[i][j] = 1;
            }
        }

        this.isAdjacencyMatrix = true;

        this.graph = adjacencyMatrix;
    }

    public BFS() {
        if (this.isAdjacencyMatrix) {
            return breadthFirstSearch(this.convertToAdjacencyList(this.graph))
        }
        return breadthFirstSearch(this.graph);
    }

    public DFS() {
        if (this.isAdjacencyMatrix) {
            return depthFirstSearch(this.convertToAdjacencyList(this.graph))
        }
        return depthFirstSearch(this.graph);
    }

    public detectCycle() {

    }

}