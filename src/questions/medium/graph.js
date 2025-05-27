const { execute } = require('../helper');

// 2467. Most Profitable Path in a Tree
// Time Complexity: O(n)
// Space Complexity: O(1)

function mostProfitablePath(edges, bob, amount) {
    const adjacencyList = Array.from({ length: edges.length + 1 }, () => []);

    for (const [u, v] of edges) {
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    const parentList = new Array(edges.length + 1).fill(-1);
    const depth = new Array(edges.length + 1).fill(0);

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

    let stack = [0];
    let maxProfit = -Infinity;
    let profitArr = new Array(amount.length + 1).fill(0);
    profitArr[0] = amount[0];
    let visited = new Array(edges.length + 1).fill(0);

    while (stack.length) {
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

execute([[0,1],[1,2],[1,3],[3,4]], 3, [-2,4,2,-4,6], mostProfitablePath);