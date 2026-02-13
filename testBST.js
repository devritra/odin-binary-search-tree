import { Tree } from "./BinarySearchTree.js";

function arrayOfRandomNumbers(){
    let array = [];
    for(let i = 1; i <= 50; i++){
        array.push(Math.round(Math.random() * 100));
    }
    return array;
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
    return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}
function printNodeData(node){
    console.log(node.data);
}

const tree = new Tree(arrayOfRandomNumbers());
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.preOrderForEach(printNodeData);
tree.inOrderForEach(printNodeData);
tree.postOrderForEach(printNodeData);
tree.insert(245);
tree.insert(300);
tree.insert(10200);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.preOrderForEach(printNodeData);
tree.inOrderForEach(printNodeData);
tree.postOrderForEach(printNodeData);