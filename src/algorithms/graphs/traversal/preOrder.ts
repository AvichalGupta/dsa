import { ArrayBasedBinaryTree } from "../../../datastructures/typescript/trees/binary-tree/array-based-tree";

export function preOrderTraversal(bTree: ArrayBasedBinaryTree<number>, nodeIndex: number, resultArr: number[]) {
    const data = bTree.getData(nodeIndex);
    if (data === null) return;
    
    resultArr.push(data);
    preOrderTraversal(bTree, (nodeIndex * 2) + 1, resultArr);
    preOrderTraversal(bTree, (nodeIndex * 2) + 2, resultArr);
}

function initialize() {
    const bTree =  new ArrayBasedBinaryTree<number>();
    bTree.setRoot(10);
    let leftParentIndex = 0, rightParentIndex = 0;

    bTree.setLeftChild(20, leftParentIndex);
    leftParentIndex = (leftParentIndex * 2) + 1;
    
    bTree.setRightChild(25, rightParentIndex);

    bTree.setLeftChild(30, leftParentIndex);
    bTree.setRightChild(35, leftParentIndex);

    const result: number[] = [];
    preOrderTraversal(bTree, 0, result);

    console.log('preOrder Traversal Result: ', JSON.stringify(result));

}

initialize();

