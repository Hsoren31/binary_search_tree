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
        const sortedArray = array.sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(array){    
        if (array.length === 0) return null;
    
        let mid = Math.floor(array.length / 2)
        let node = new Node(array[mid]);
    
        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid + 1));
    
        return node;
    }

    insert(key){
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
        console.log(value, root)
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
}

let array = [ 4, 7, 3, 1, 9, 12, 45, 78, 8];

const test = new Tree(array);
console.log(test);
test.levelOrder(print)

function print(node){
    console.log('Printing', node);
}