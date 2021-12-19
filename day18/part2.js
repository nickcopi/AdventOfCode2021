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


const addLeftMost = (node,value)=>{
	if(!node.parent) return;
	if(node === node.parent.children[0]) return addLeftMost(node.parent,value);
	return rightAdd(node.parent.children[0],value);
}

const addRightMost = (node,value)=>{
	if(!node.parent) return;
	if(node === node.parent.children[1]) return addRightMost(node.parent,value);
	return leftAdd(node.parent.children[1],value);
}

const leftAdd = (node,value)=>{
	if(!node.children.length){
		node.value += value;
		return;
	}
	return leftAdd(node.children[0],value);
}
const rightAdd = (node,value)=>{
	if(!node.children.length){
		node.value += value;
		return;
	}
	return rightAdd(node.children[1],value);
}

const explode = node=>{
	let target;
	if(node.parent){
		//left
		target = node;
		addLeftMost(target, node.children[0].value);
		//right
		target = node;
		addRightMost(target, node.children[1].value);
	}
	node.value = 0;
	node.children = [];
	return node;
}

const checkExplode = (node, depth=0)=>{
	if(!node) return;
	if(depth === 5) return node.parent; 
	return [checkExplode(node.children[0],depth+1),checkExplode(node.children[1],depth+1)];
}

const checkSplit = (node)=>{
	if(!node) return;
	if(!node.children.length){
		if(node.value > 9) return node;
		return;
	}
	let checkLeft = checkSplit(node.children[0]);
	if(checkLeft) return checkLeft;
	return checkSplit(node.children[1]);
}

const split = node=>{
	node.children = [new Node(Math.floor(node.value/2),node), new Node(Math.ceil(node.value/2),node)];
	node.value = undefined;
}

const getMagnitude = node=>{
	if(!node.children.length) return node.value;
	return 3*getMagnitude(node.children[0]) + 2 * getMagnitude(node.children[1]);
};

const add = (a,b)=>{
	const newRoot = new Node();
	a.parent = newRoot;
	b.parent = newRoot;
	newRoot.children = [a,b];
	return newRoot;
}


const reduce = node=>{
	const toExplode = checkExplode(node).flat(Infinity).filter(Boolean)[0];
	if(toExplode){ 
		explode(toExplode);
		return reduce(node);
	}
	const toSplit = checkSplit(node);
	if(toSplit){
		split(toSplit);
		return reduce(node);
	}
	return node;
}

//const a = buildTree([[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],new Node())
//const b = buildTree([7,[[[3,7],[4,3]],[[6,3],[8,8]]]],new Node())
//const sum = add(a,b);
//reduce(sum);
//console.log(JSON.stringify(readTree(sum)));

//const sum = trees.reduce((acc,cur)=>reduce(add(acc,cur)));
//
//const magnitude = getMagnitude(sum);	
//
//console.log(JSON.stringify(readTree(sum)));
//console.log(magnitude);

let maxMagnitude = 0;
numbers.forEach((number,i)=>{
	let tree = buildTree(number,new Node());
	numbers.forEach((otherNumber,j)=>{
		if(i === j) return;
		otherTree = buildTree(otherNumber, new Node());
		tree = buildTree(number,new Node());
		const magnitude = getMagnitude(reduce(add(tree,otherTree)));
		if(magnitude > maxMagnitude){ 
			//console.log(JSON.stringify(readTree(tree)));
			//console.log(JSON.stringify(readTree(otherTree)));
			maxMagnitude = magnitude;
		}
	});
});

console.log(maxMagnitude);
