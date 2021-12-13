const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n');

let points = new Set();
const folds = [];
let gotPoints = false;
data.forEach(line=>{
	if(!line) return gotPoints=true;
	if(gotPoints){
		if(!line) return;
		const fold = line.split('fold along ')[1].split('=');
		fold[1] = Number(fold[1]);
		folds.push(fold);
	} else {
		//points.push(line.split(',').map(Number));
		points.add(line);
	}
});
//console.log(points,folds);
folds.forEach(fold=>{
	let newPoints = new Set();
	const mapCoord = fold[0] === 'y'?1:0;
	const numberPoints = [...points].map(a=>a.split(',').map(Number));
	numberPoints.forEach(point=>{
		if(point[mapCoord] < fold[1])
			newPoints.add(point.toString());
		else {
			point[mapCoord] = fold[1]-point[mapCoord]+fold[1];
			newPoints.add(point.toString());
		}
	});
	points = newPoints;
});
console.log(points);
console.log(points.size);
const finalPoints = [...points].map(a=>a.split(',').map(Number));
const x = finalPoints.sort((a,b)=>b[0]-a[0])[0][0];
const y = finalPoints.sort((a,b)=>b[1]-a[1])[0][1];
console.log(x,y);
let str = '';
for(let j = 0; j <= y; j++){
	for(let i = 0; i <= x; i++){
		if(points.has(i+','+j)) str += '#';
		else str += '.';
	}
	str += '\n';
}
console.log(str);
