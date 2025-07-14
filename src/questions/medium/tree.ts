import { LinkedListNode } from "../../datastructures/typescript/trees/binary-tree/linked-list-based-tree";
import { executeTree } from "../helper";

function cloneNaryTree(root: LinkedListNode<number>): LinkedListNode<number> {
    const clone = new LinkedListNode<number>(root.getData());

    return clone;
}

executeTree([], cloneNaryTree);