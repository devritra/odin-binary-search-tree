class Node{
    constructor(){
        this.data = null;
        this.left = null;
        this.right = null;
    }
}

export class Tree{
    constructor(array){
        this.root = this.#buildTree(array);
    }

    static newNodeArr = [];
    #buildTree(array){
        const duplicateFreeArray = [...new Set(array)];
        duplicateFreeArray.sort((a, b) => a - b);
        const start = 0;
        const end = duplicateFreeArray.length - 1;
        const root = this.#buildBstFromSortedArray(duplicateFreeArray, start, end);
        return root;
    }

    #buildBstFromSortedArray(array, start, end){
        if(start > end){
            return null;
        }
        const mid = start + Math.round(((end - start) / 2)); 
        const root = new Node();
        root.data = array[mid];
        root.left = this.#buildBstFromSortedArray(array, start, mid - 1);
        root.right = this.#buildBstFromSortedArray(array, mid + 1, end);
        
        return root;
    }

    includes(value){
        let queue = [];
        // let temp = this.root;
        queue.push(this.root);
        while(queue.length !== 0){
            let tempArr = [];
            let queueCopyForLoop = [...queue];
            for(const item of queueCopyForLoop){
                if(item.data === value){
                    return true;
                }
                if(item.left){
                    tempArr.push(item.left);
                }
                if(item.right){
                    tempArr.push(item.right);
                }   
                queue.shift();
            }
            queue = [...tempArr];
        }
        return false;
    }

    insert(value){
        let temp = this.root;
        while(temp.left || temp.right){
            if(value === temp.data){
                return;
            } else if(value < temp.data){
                if(temp.left){
                    temp = temp.left;
                    continue;
                }
                const newNode = new Node();
                newNode.data = value;
                temp.left = newNode;
                return;
            } else if(value > temp.data){
                if(temp.right){
                    temp = temp.right;
                    continue;
                }
                const newNode = new Node();
                newNode.data = value;
                temp.right = newNode;
                return;
            }
        }
        if(value < temp.data){
            const newNode = new Node();
            newNode.data = value;
            temp.left = newNode;
        } else{
            const newNode = new Node();
            newNode.data = value;
            temp.right = newNode;
        }
        return;
    }

    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null)
            curr = curr.left;
        return curr;
    }

    // Delete a node with value x from BST
    deleteItem(value, root = this.root) {
        if (root === null)
            return root;

        if (root.data > value)
            root.left = this.deleteItem(value, root.left);
        else if (root.data < value)
            root.right = this.deleteItem(value, root.right);
        else {
            // Node with 0 or 1 child
            if (root.left === null)
                return root.right;
            if (root.right === null)
                return root.left;

            // Node with 2 children
            const succ = this.getSuccessor(root);
            root.data = succ.data;
            root.right = this.deleteItem(succ.data, root.right);
        }
        return root;
    }

    levelOrderForEach(callback){
        let queue = [];
        queue.push(this.root);
        while(queue.length !== 0){
            let tempArr = [];
            let queueCopyForLoop = [...queue];
            for(const item of queueCopyForLoop){
                callback(item.data);
                if(item.left){
                    tempArr.push(item.left);
                }
                if(item.right){
                    tempArr.push(item.right);
                }   
                queue.shift();
            }
            queue = [...tempArr];
        }
        return;
    }

    levelOrderForEachRec(callback, queue = [this.root]){
        if(queue.length === 0){
            return;
        } else{
            let tempArr = [];
            let queueCopyForLoop = [...queue];
            for(const item of queueCopyForLoop){
                callback(item.data);
                if(item.left){
                    tempArr.push(item.left);
                }
                if(item.right){
                    tempArr.push(item.right);
                }   
                queue.shift();
            }
            queue = [...tempArr];
            return this.levelOrderForEachRec(callback, queue);
        }
    }

    inOrderForEach(callback, root = this.root){
        if(!root){
            return;
        }
        if(!root.left && !root.right){
            callback(root);
        } else{
            this.inOrderForEach(callback, root.left);
            callback(root);
            this.inOrderForEach(callback, root.right);
        }
        
    }

    preOrderForEach(callback, root = this.root){
        if(!root){
            return;
        }
        if(!root.left && !root.right){
            callback(root);
        } else{
            callback(root);
            this.preOrderForEach(callback, root.left);
            this.preOrderForEach(callback, root.right);
        }
        
    }

    postOrderForEach(callback, root = this.root){
        if(!root){
            return;
        }
        if(!root.left && !root.right){
            callback(root);
        } else{
            this.postOrderForEach(callback, root.left);
            this.postOrderForEach(callback, root.right);
            callback(root);
        }
        
    }

    getNode(value){
        let queue = [];
        // let temp = this.root;
        queue.push(this.root);
        while(queue.length !== 0){
            let tempArr = [];
            let queueCopyForLoop = [...queue];
            for(const item of queueCopyForLoop){
                if(item.data === value){
                    return item;
                }
                if(item.left){
                    tempArr.push(item.left);
                }
                if(item.right){
                    tempArr.push(item.right);
                }   
                queue.shift();
            }
            queue = [...tempArr];
        }
        return undefined;
    }

    getHeightOfNode(root, height = 0){
        if(!root){
            return height - 1;
        }
        if(!root.left && !root.right){
            return height;
        } else{
            const leftHeight = this.getHeightOfNode(root.left, height + 1);
            const rightHeight = this.getHeightOfNode(root.right, height + 1);
            if(leftHeight === rightHeight){
                return leftHeight;
            } else if(leftHeight > rightHeight){
                return leftHeight;
            } else if(leftHeight < rightHeight){
                return rightHeight;
            }
        }
    }

    height(value){
        const targetNode = this.getNode(value);
        if(!targetNode){
            return undefined;
        }
        const height = this.getHeightOfNode(targetNode);
        return height;
    }

    getDepthOfNode(value, root = this.root, depth = 0){
        if(!root){
            return undefined;
        }
        if(root.data === value){
            return depth;
        } else{
            const leftDepth = this.getDepthOfNode(value, root.left, depth + 1);
            if(leftDepth){
                return leftDepth;
            }
            const rightDepth = this.getDepthOfNode(value, root.right, depth + 1);
            if(rightDepth){
                return rightDepth;
            }
        }
    }
    depth(value){
        if(!this.includes(value)){
            return undefined;
        }
        const depth = this.getDepthOfNode(value);
        return depth;
    }

    isBalanced(root = this.root, isHeightBalanced = true){
        if(!root){
            return;
        }
        if(!root.left && !root.right){
            return this.getHeightOfNode(root);
        } else{
            const leftHeight = this.isBalanced(root.left);
            const rightHeight = this.isBalanced(root.right);
            
            const heightDiff = Math.abs(leftHeight - rightHeight);
            if(heightDiff > 1){
                return isHeightBalanced = false;
            }

            const leftTotalHeight = this.getHeightOfNode(root.left);
            const rightTotalHeight = this.getHeightOfNode(root.right);
            const totalHeightDiff = Math.abs(leftTotalHeight - rightTotalHeight);
            if(totalHeightDiff > 1){
                return isHeightBalanced = false;
            }
        }
        return isHeightBalanced;
    }

    
    pushNodeDataToNewNodeArr(node){
        Tree.newNodeArr.push(node.data);
    }
    rebalance(){
        Tree.newNodeArr = [];
        this.preOrderForEach(this.pushNodeDataToNewNodeArr);
        this.root = this.#buildTree(Tree.newNodeArr);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
    return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

// const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const testTree = new Tree(testArray);

// prettyPrint(testTree.root);
// console.log(testTree.includes(2));
// testTree.insert(6);
// prettyPrint(testTree.root);
// testTree.deleteItem(6345);
// testTree.deleteItem(67);
// testTree.deleteItem(324);
// prettyPrint(testTree.root);
// console.log(testTree.height(2));
// console.log(testTree.depth(2));
// console.log(testTree.isBalanced());
// testTree.rebalance();
// prettyPrint(testTree.root);