import _ from 'lodash';
import './style.css';

class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }

    buildTree(array){    
        if (array.length === 0) return null;
        const sortedArray = array.sort((a, b) => a - b);
    
        let mid = Math.floor(sortedArray.length / 2)
        let node = new Node(sortedArray[mid]);
    
        node.left = this.buildTree(sortedArray.slice(0, mid));
        node.right = this.buildTree(sortedArray.slice(mid + 1));
    
        return node;
    }

    insert(key){
    if(this.find(key) !== null)return;
    let temp = new Node(key);

    if (this.root === null){
        return temp;
    }

    let parent = null;
    let current = this.root;

    while (current !== null){
        parent = current;

        if (current.data > key){
            current = current.left
        } else if (current.data < key){
            current = current.right
        } else {
            return this.root;
        }
    }

    if (parent.data > key){
        parent.left = temp;
    } else {
        parent.right = temp;
    }

    return this.root;
}

    deleteItem(key, root = this.root){
        if (root === null) return root;

        if (root.data > key){
            root.left = this.deleteItem(key, root.left);
        } else if (root.data < key){
            root.right = this.deleteItem(key, root.right);
        } else {
            if (root.left === null){
                return root.right
            }

            if (root.right === null){
                return root.left
            }

            let successor = this.getSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteItem(successor.data, root.right);
        }

        return root;
    }

    getSuccessor(current){
        current = current.right;
        while (current !== null && current.left !== null){
            current = current.left;
        }
        return current;
    }

    find(value, root = this.root){
        if (root.data === value){
            return root;
        } else if (root === null){
            return null;
        }

        if (root.data > value){
            return this.find(value, root.left)
        } else if (root.data < value){
            return this.find(value, root.right)
        }
    }

    levelOrder(callback){
        if(this.root === null) return;
        let queue = [this.root];

        if (callback === null){
            throw new Error('Please provide a callback')
        }

        while(queue.length !== 0){
            let current = queue.shift();
            
            callback(current);

            if (current.left !== null){
                queue.push(current.left)
            }
            if (current.right !== null){
                queue.push(current.right)
            }
        }
    }

    inOrder(callback, root = this.root){
        if(callback === null) {
            throw new Error('Please provide a callback')
        }

        if(root === null) return;
        this.inOrder(callback, root.left)
        callback(root);
        this.inOrder(callback, root.right)
    }

    preOrder(callback, root = this.root){
        if(callback === null){
            throw new Error('Please provide a callback')
        }

        if (root === null) return;

        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    postOrder(callback, root = this.root){
        if (callback === null){
            throw new Error('Please provide a callback')
        }

        if (root === null) return;

        this.postOrder(callback, root.left)
        this.postOrder(callback, root.right)
        callback(root)
    }

    height(target, root = this.find(target)){
        if (root === null) return -1

        const leftHeight = this.height(target, root.left);
        const rightHeight = this.height(target, root.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(target, root = this.root, distance = 0){
        if (root === null){
            return -1
        }
        if (root.data === target){
            return distance;
        }

        if (root.data > target){
            return this.depth(target, root.left, distance + 1)
        } else {
            return this.depth(target, root.right, distance + 1)
        }
    }

    isBalanced(root = this.root){
        if(root === null) return -1;

        const leftHeight = this.height(root.left.data);
        const rightHeight = this.height(root.right.data);

        const difference = Math.abs(leftHeight - rightHeight);

        if(difference <= 1){
            return true
        } else {
            return false
        }
    }

    rebalance(){
        const values = []
        function pushValues(value){
            values.push(value.data)
        }
        this.postOrder(pushValues);
        this.root = this.buildTree(values);
    }
}