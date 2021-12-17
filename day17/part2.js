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

let validYs = 0;
let validXs = 0;
let valids = 0;
const simulateY= (i)=>{
	let y = 0;
	let velocity = i;
	let hit = false;
	while(y >= minY){
		if(y >= minY && y <= maxY) hit = true;
		y += velocity;
		velocity--;
	}
	if(hit) validYs++;
	return hit;
}
const simulateX= (i)=>{
	let x = 0;
	let velocity = i;
	let hit = false;
	while(velocity > -1){
		if(x >= minX && x <= maxX) hit = true;
		x += velocity;
		velocity--;
	}
	if(hit) validXs++;
	return hit;
}

const simulate= (vx0,vy0)=>{
	let x = 0;
	let y = 0;
	let vx = vx0;
	let vy = vy0;
	let hit = false;
	while(y >= minY && x <= maxX){
		if(x >= minX && x <= maxX && y >= minY && y <= maxY) hit = true;
		x += vx;
		vx--;
		vx = Math.max(vx,0);
		y += vy;
		vy--;
	}
	if(hit) valids++;
	return hit;
}

for(let x = 0; x < 1000; x++){
	for(let y = -1000; y < 1000; y++){
		simulate(x,y);
	}
}
console.log(valids);
