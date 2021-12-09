const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const map = [];
data.forEach(line=>{
	map.push(line.split('').map(Number));
});
//console.log(map);

const isLowPoint = (num,x,y)=>{
	if(y-1 >= 0)
		if(map[y-1][x] <= num) return false;
	if(y+1 < map.length)
		if(map[y+1][x] <= num) return false;
	if(x-1 >= 0)
		if(map[y][x-1] <= num) return false;
	if(x+1 < map[0].length)
		if(map[y][x+1] <= num) return false;
	return true;
}

const dangers = [];
for(let x = 0; x < map[0].length;x++){
	for(let y = 0; y < map.length;y++){
		const num = map[y][x];
		if(isLowPoint(num,x,y))
			dangers.push(num);
	}
}
//console.log(dangers);
const sum = dangers.reduce((acc,cur)=>acc+cur+1,0);
console.log(sum);
