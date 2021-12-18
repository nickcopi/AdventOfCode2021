const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const numbers = data.map(line=>JSON.parse(line));
class Node{
	constructor(value,parent){
		if(typeof value === 'number')
			this.value = value;
		this.children = [];
		this.parent = parent;
	}
}

const buildTree = (number,root)=>{
	if(!number.length) return;
	root.children[0] = new Node(number[0],root);
	root.children[1] = new Node(number[1],root);
	buildTree(number[0],root.children[0]);
	buildTree(number[1],root.children[1]);
	return root;
}

const readTree = (root)=>{
	if(!root.children.length) return root.value;
	return [readTree(root.children[0]),readTree(root.children[1])];

}


//console.log(JSON.stringify(readTree(buildTree([7,[6,[5,[4,[3,2]]]]],new Node()))));

const trees = numbers.map(number=>buildTree(number, new Node(number)));

const explode = node=>{
	let target;
	if(node.parent){
		target = node.parent.children[0];
		if(target === node) target = target.parent.children[1];
		//addLeftmost(target, node);
	}
}

const add = (a,b)=>{
	if(typeof a === "number" && typeof b === "number")
		return a+b;
	return [a,b];
}


const reduce = number=>{
}
