const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);


class Octopus{
	constructor(energy,x,y,){
		this.x = x;
		this.y = y;
		this.energy = energy;
		this.flashed = false;
		this.incremented = false;
		this.neighbors = [];
	}
	setNeighbors(){
		const x = this.x;
		const y = this.y;
		if(y-1 >= 0 && x-1 >= 0)
			this.neighbors.push(map[y-1][x-1]);
		if(y-1 >= 0)
			this.neighbors.push(map[y-1][x]);
		if(y-1 >= 0 && x+1 < map[0].length)
			this.neighbors.push(map[y-1][x+1]);
		if(x-1 >= 0)
			this.neighbors.push(map[y][x-1]);
		if(x+1 < map[0].length)
			this.neighbors.push(map[y][x+1]);
		if(y+1 < map.length && x-1 >=0)
			this.neighbors.push(map[y+1][x-1]);
		if(y+1 < map.length)
			this.neighbors.push(map[y+1][x]);
		if(y+1 < map.length && x+1 < map[0].length)
			this.neighbors.push(map[y+1][x+1]);
	}
}

const map = [];
data.forEach((line,y)=>{
	map.push([...line].map((num,x)=>new Octopus(Number(num),x,y)));
});

const showMap = ()=>{
	let str = '';
	map.forEach(line=>{
		str+=line.map(l=>l.energy).join('')+'\n';
	});
	console.log(str);
}

for(let x = 0; x < map[0].length;x++){
	for(let y = 0; y < map.length;y++){
		map[y][x].setNeighbors();
	}
}
let flashCount = 0;
for(let i = 0; i < 100; i++){
	for(let y = 0; y < map.length;y++){
		for(let x = 0; x < map[0].length;x++){
			const tile = map[y][x];
			if(tile.flashed) continue;
			if(!tile.incremented){
				tile.incremented = true;
				tile.energy++;
			}
			if(tile.energy > 9){
				tile.flashed = true;
				flashCount++;
				tile.neighbors.forEach(n=>n.energy++);
				//console.log(x,y);
				y = tile.neighbors[0].y;
				x = tile.neighbors[0].x-1;
				if(x === map[0].length-1) y--;
				//console.log(x,y);
				//if(flashCount > 1) process.exit();
			}
		}
	}
	for(let x = 0; x < map[0].length;x++){
		for(let y = 0; y < map.length;y++){
			const tile = map[y][x];
			tile.incremented = false;
			if(tile.flashed){
				tile.flashed = false;
				tile.energy = 0;
			}
		}
	}
	showMap();
}
//console.log(map);
console.log(flashCount);
//console.log(map[0][0].neighbors);
