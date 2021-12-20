const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n');
if(!data[data.length-1]) data.pop();
let scanners = [[]];
let i = 0;
while(data.length){
	const line = data.shift()	
	if(!line){
		i++;
		scanners.push([]);
		continue;
	}
	if(line[0] === '-' && line[1] === '-') continue;
	scanners[i].push(line.split(',').map(Number));
}
console.log(scanners);
