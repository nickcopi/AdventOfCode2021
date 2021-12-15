const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);


class Chiton{
	constructor(danger,x,y){
		this.danger = danger;
		this.x = x;
		this.y = y;
		this.f = 0;
		this.neighbors = [];
		this.parent = null;
	}
	setNeighbors(){
		const x = this.x;
		const y = this.y;
		/*if(y-1 >= 0 && x-1 >= 0)
			this.neighbors.push(map[y-1][x-1]);*/
		if(y-1 >= 0)
			this.neighbors.push(map[y-1][x]);
		/*if(y-1 >= 0 && x+1 < map[0].length)
			this.neighbors.push(map[y-1][x+1]);*/
		if(x-1 >= 0)
			this.neighbors.push(map[y][x-1]);
		if(x+1 < map[0].length)
			this.neighbors.push(map[y][x+1]);
		/*if(y+1 < map.length && x-1 >=0)
			this.neighbors.push(map[y+1][x-1]);*/
		if(y+1 < map.length)
			this.neighbors.push(map[y+1][x]);
		/*if(y+1 < map.length && x+1 < map[0].length)
			this.neighbors.push(map[y+1][x+1]);*/
	}
}
const dist = (x1,y1,x2,y2)=>{
	return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}


const map = [];
data.forEach((line,y)=>{
	map.push(line.split('').map((value,x)=>new Chiton(Number(value),x,y)));
});
for(let x = 0; x < map[0].length;x++){
	for(let y = 0; y < map.length;y++){
		map[y][x].setNeighbors();
	}
}
//console.log(map);

const start = map[0][0];
const end = map[map.length-1][map[0].length-1];
let openSet = [start];
const closedSet = [];
const doAstar = ()=>{
	while(openSet.length !== 0){
		let winner = 0;
		openSet.forEach((open,i)=>{
			if(open.f < openSet[winner].f){
				winner = i;
			}
		});
		let current = openSet[winner];
		if(current === end) return current;
		openSet = openSet.filter(open=>open !== current);
		closedSet.push(current);
		for(let i = 0; i < current.neighbors.length; i++){
			let neighbor = current.neighbors[i];
			if(closedSet.includes(neighbor)) continue;
			const tempG = (current.g === undefined)?neighbor.danger:current.g+neighbor.danger;
			if(!openSet.includes(neighbor)){
				openSet.push(neighbor);
			} else {
				if(tempG >= neighbor.g)
					continue;
			}
			neighbor.parent = current;
			neighbor.g = tempG;
			neighbor.f = tempG + dist(neighbor.x,neighbor.y,end.x,end.y);
		}
	}
}
const path = doAstar();
console.log(path);
const sumPath = (path,sum)=>{
	if(!path.parent) return sum;
	//console.log(`(${path.x},${path.y}) danger: ${path.danger}`);
	return sumPath(path.parent,sum+path.danger);
}
const sum = sumPath(path,0);
console.log(sum);
