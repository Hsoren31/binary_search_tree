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
}

let array = [ 4, 7, 3, 1, 9, 12, 45, 78, 8];

const test = new Tree(array);
console.log(test);