import { ArrayBasedBinaryTree } from "../../../datastructures/typescript/trees/binary-tree/array-based-tree";

export function preOrderTraversal(bTree: ArrayBasedBinaryTree<number>, nodeIndex: number) {
    if (bTree.getData(nodeIndex) === null) return;
    
    console.log('PreOrder Traversal Data: ', bTree.getData(nodeIndex), '\n');

    preOrderTraversal(bTree, (nodeIndex * 2) + 1);
    preOrderTraversal(bTree, (nodeIndex * 2) + 2);
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

    preOrderTraversal(bTree, 0);

}

initialize();

