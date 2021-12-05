const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);
const lines = data.map((line,i)=>{
	const split = line.split(' -> ');
	const from = split[0].split(',').map(n=>Number(n));
	const to = split[1].split(',').map(n=>Number(n));
	return {
		from:{
			x: from[0],
			y: from[1],
		},
		to:{
			x: to[0],
			y: to[1],
		},
		id:i
	}
});
//console.log(lines.filter(line=>line.from.x === line.to.x && line.from.y === line.to.y));
const getSlope = (x1,y1,x2,y2)=>{
	return (y2-y1)/(x2-x1);
}
const getLineSlope = line=>{
	return getSlope(line.from.x,line.from.y,line.to.x,line.to.y);
}
const fillLine = (line,rise,run)=>{
	while(!(line.from.x === line.to.x && line.from.y === line.to.y)){
		map[line.from.y][line.from.x].push(line.id);
		//console.log(line.from.x,line.from.y);
		line.from.x += run;
		line.from.y += rise;
	}
	map[line.from.y][line.from.x].push(line.id);
}
const map = [];
for(let i = 0; i < 1000; i++){
	map[i]=[];
	for(let j = 0; j < 1000;j++){
		map[i][j] = [];
	}
}
lines.forEach(line=>{
	//if(line.id >1) return;
	const slope = getLineSlope(line);	
	//if(slope !== 0 && slope !== Infinity && slope !== -Infinity) return;
	//if(!(line.from.x === line.to.x || line.from.y===line.to.y)) return;
	let rise,run;
	if(slope === Infinity || slope === -Infinity){
		rise = (line.from.y > line.to.y)?-1:1;
		run = 0;
	} else if (slope ===0){
		rise = 0;
		run = (line.from.x > line.to.x)?-1:1;
	}
	else{
		rise = (line.from.y > line.to.y)?-1:1;
		run = (line.from.x > line.to.x)?-1:1;
	}
	fillLine(line,rise,run);
});
console.log(map.flat().filter(a=>a.length > 1).length)
//console.log(map[0][0]);
//console.log(lines.filter(line=>!(line.from.x === line.to.x && line.from.y === line.to.y)));
