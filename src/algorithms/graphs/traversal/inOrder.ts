import { ArrayBasedBinaryTree } from "../../../datastructures/trees/binary-tree/array-based-tree";

export function postOrderTraversal(bTree: ArrayBasedBinaryTree<number>, nodeIndex: number, resultArr: number[]) {
    const data = bTree.getData(nodeIndex);
    if (data === null) return;

    postOrderTraversal(bTree, (nodeIndex * 2) + 1, resultArr);
    resultArr.push(data);
    postOrderTraversal(bTree, (nodeIndex * 2) + 2, resultArr);
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
    postOrderTraversal(bTree, 0, result);

    console.log('preOrder Traversal Result: ', JSON.stringify(result));

}

initialize();