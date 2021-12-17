const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);
const line = data[0];
const split = line.split('=');
const xCoords = split[1].split(',');
const xSplit = xCoords[0].split('..');
const minX = Number(xSplit[0]);
const maxX = Number(xSplit[1]);
const ySplit = split[2].split('..');
const minY = Number(ySplit[0]);
const maxY = Number(ySplit[1]);
console.log(minX,maxX,minY,maxY);

const results = [];
const simulateY= (i)=>{
	let y = 0;
	let velocity = i;
	let hit = false;
	let highestY = 0;
	while(y >= minY){
		if(y >= minY && y <= maxY) hit = true;
		if(y > highestY) highestY = y;
		y += velocity;
		velocity--;
	}
	if(hit) results.push(highestY);
	return hit;
}

for(let i = 0; i < 1000; i++){
	simulateY(i);
}
console.log(results.sort((a,b)=>b-a));
