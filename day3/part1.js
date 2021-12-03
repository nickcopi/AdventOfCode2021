
const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const onesCount = (new Array(data[0].length)).fill(0);

data.forEach(line=>{
	[...line].forEach((bit,i)=>{
		if(bit === '1') onesCount[i]++;
	});
});

const gamma = onesCount.map(count=>(count < data.length/2)?0:1).join('');
const epsilon = onesCount.map(count=>(count < data.length/2)?1:0).join('');

console.log(gamma,epsilon);

const power = parseInt(gamma,2) * parseInt(epsilon,2);

console.log(power);

