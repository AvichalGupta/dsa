export function unionFind(edges: number[][]) {
    const parentMap: Map<number, number> = new Map<number, number>();
    const rankMap: Map<number, number> = new Map<number, number>();

    let connectedComponents = parentMap.size;

    for (const [u, v] of edges) {
        parentMap.set(u, u);
        parentMap.set(v, v);
        rankMap.set(u, 1);
        rankMap.set(v, 1);
    }

    // keep visiting parent till parent of current value is not itself.
    // when equal, found highest rank parent.
    // set highest rank parent as parent of current edge.

    function findParent(edge: number): number {
        let tempVal = edge;
        let tempParent = parentMap.get(tempVal)
        while (tempVal !== tempParent) {
            tempParent = parentMap.get(tempParent!);
        }
        return tempParent;
    }

    function union(edge1: number, edge2: number): number {
        let parentOfEdge1 = findParent(edge1);
        let parentOfEdge2 = findParent(edge2);

        if (parentOfEdge1 === parentOfEdge2) return 0;

        if (parentOfEdge1 > parentOfEdge2) {
            parentMap.set(edge2, parentOfEdge1);
            rankMap.set(edge1, rankMap.get(edge1) ?? 1 + (rankMap.get(edge2) ?? 1));
        } else {
            parentMap.set(edge1, parentOfEdge2);
            rankMap.set(edge2, rankMap.get(edge2) ?? 1 + (rankMap.get(edge1) ?? 1));
        }
        return 1;
    }

    for (const [u, v] of edges) {
        connectedComponents -= union(u, v);
    }

    return connectedComponents;
}

// [[0,1],[1,2],[3,4],[0,2]]