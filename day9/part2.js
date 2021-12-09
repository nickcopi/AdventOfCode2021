const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const map = [];

class Tile{
	constructor(x,y,num){
		this.x = x;
		this.y = y;
		this.num = num;
		this.neighbors = [];
		this.fill = null;
	}
	setNeighbors(){
		const x = this.x;
		const y = this.y;
		if(y-1 >= 0)
			this.neighbors.push(map[y-1][x])
		if(y+1 < map.length)
			this.neighbors.push(map[y+1][x]);
		if(x-1 >= 0)
			this.neighbors.push(map[y][x-1]);
		if(x+1 < map[0].length)
			this.neighbors.push(map[y][x+1]);
	}
}

data.forEach(line=>{
	map.push(line.split('').map(Number));
});

for(let x = 0; x < map[0].length;x++){
	for(let y = 0; y < map.length;y++){
		map[y][x] = new Tile(x,y,map[y][x]);
	}
}
for(let x = 0; x < map[0].length;x++){
	for(let y = 0; y < map.length;y++){
		map[y][x].setNeighbors();
	}
}

const floodFill = (num,fill)=>{
	let toFill = [num];
	while(toFill.length){
		const target = toFill.shift();
		if(target.num === 9 || target.fill !== null) continue;
		target.fill = fill;
		toFill = toFill.concat(target.neighbors);
	}
}

const dangers = [];
let fills = 0;
for(let x = 0; x < map[0].length;x++){
	for(let y = 0; y < map.length;y++){
		const tile = map[y][x];
		if(tile.num === 9) continue;
		if(tile.fill === null)
			floodFill(tile,fills++);
	}
}

const flat = map.flat();
const basinSizes = [];
for(let i = 0; i < fills;i++){
	basinSizes.push(flat.filter(tile=>tile.fill === i).length);
}
const product = basinSizes.sort((a,b)=>b-a).slice(0,3).reduce((acc,cur)=>acc*cur,1);
console.log(product);

//console.log(map)
//console.log(map[0][0]);
