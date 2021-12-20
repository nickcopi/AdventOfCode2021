const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const key = [...data.shift()].map(a=>a==='#'?1:0);
let turn = 1;
class Tile{
	constructor(value){
		this.value = value;
		this.neighbors = [];
	}
	setNeighbors(x,y){
		this.neighbors = [];
		if(y-1 >= 0 && x-1 >= 0)
			this.neighbors.push(map[y-1][x-1]);
		if(y-1 >= 0)
			this.neighbors.push(map[y-1][x]);
		if(y-1 >= 0 && x+1 < map[0].length)
			this.neighbors.push(map[y-1][x+1]);
		if(x-1 >= 0)
			this.neighbors.push(map[y][x-1]);
		this.neighbors.push(this);
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
	map.push([...line].map((num,x)=>new Tile(num==='#'?1:0,x,y)));
});

const showMap = ()=>{
	let str = '';
	map.forEach(line=>{
		str+=line.map(l=>l.value?'#':'.').join('')+'\n';
		//str+=line.map(l=>l.neighbors.length).join('')+'\n';
	});
	console.log(str);
}

for(let x = 0; x < map[0].length;x++){
	for(let y = 0; y < map.length;y++){
		map[y][x].setNeighbors(x,y);
	}
}

const neighborRim = ()=>{

	map[0].forEach((tile,i)=>tile.setNeighbors(i,0));
	map[1].forEach((tile,i)=>tile.setNeighbors(i,1));
	for(let i = 0; i < map.length;i++){
		const line = map[i];
		line[0].setNeighbors(0,i);
		line[1].setNeighbors(1,i);
		line[line.length-1].setNeighbors(line.length-1,i);
		line[line.length-2].setNeighbors(line.length-2,i);
	}
	map[map.length-2].forEach((tile,i)=>tile.setNeighbors(i,map.length-2));
	map[map.length-1].forEach((tile,i)=>tile.setNeighbors(i,map.length-1));
}

const flipRim = ()=>{
	map[0].forEach(tile=>tile.value = Number(!tile.value));
	for(let i = 1; i < map.length-1;i++){
		const line = map[i];
		line[0].value = Number(!line[0].value)
		line[line.length-1].value = Number(!line[line.length-1].value);
	}
	map[map.length-1].forEach(tile=>tile.value = Number(!tile.value));

}

const encrust = value=>{
	let top = [];
	let bottom = [];
	if(!value){
		if(key[0]){
			if(turn%2)
				value = 0;
			else
				value = 1;
		}
	}
	for(let i = 0; i < map[0].length+2;i++){
		top.push(new Tile(value));
		bottom.push(new Tile(value));
	}
	map.forEach(line=>{
		line.unshift(new Tile(value));
		line.push(new Tile(value));
	});
	map.unshift(top);
	map.push(bottom);
}

const enhance = ()=>{
	const flip = [];
	for(let x = 0; x < map[0].length;x++){
		for(let y = 0; y < map.length;y++){
			const tile = map[y][x];
			if(tile.neighbors.length === 9){
				const index = parseInt(tile.neighbors.map(a=>a.value).reduce((acc,cur)=>acc+cur,''),2);
				//console.log(x,y,index);
				const value = key[index];
				if(value !== tile.value)
					flip.push({x,y});
			}
		}
	}
	flip.forEach(flip=>{
		const tile = map[flip.y][flip.x];
		tile.value = Number(!tile.value);
	});
	
}

encrust();
neighborRim();
const growMap = ()=>{
	encrust();
	neighborRim();
	showMap();
	enhance();
	showMap();
	if(key[0]) flipRim();
	showMap();
	turn++;
}
growMap();
growMap();

const lit = map.flat().reduce((acc,cur)=>acc+cur.value,0);
console.log(lit);
