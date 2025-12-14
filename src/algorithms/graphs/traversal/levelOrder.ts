import { ArrayBasedBinaryTree } from "../../../datastructures/trees/binary-tree/array-based-tree";

export function levelOrderTraversal(bTree: ArrayBasedBinaryTree<number>): number[] {
    
    let leftIndex = 0;
    let rightIndex = 0;

    const result: number[] = [];

    const queue: number[] = [];
    let iter = 0;
    let tempLen = 0;
    let data = null;
    let leftChild = null;
    let rightChild = null;

    while (iter < queue.length) {

        tempLen = queue.length - iter;
        
        for (let i = 0; i < tempLen; i++) {
            
            leftIndex = iter * 2 + 1;
            rightIndex = iter * 2 + 2;

            data = bTree.getData(iter);
            if (data) {
                result.push(data);
            }

            leftChild = bTree.getLeftChild(iter);
            rightChild = bTree.getRightChild(iter);
            
            if (leftChild) {
                queue.push(leftChild);
            }

            if (rightChild) {
                queue.push(rightChild);
            }
            iter++;
        }
    }

    return result;
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

    const result = levelOrderTraversal(bTree);

    console.log('preOrder Traversal Result: ', JSON.stringify(result));

}

initialize();