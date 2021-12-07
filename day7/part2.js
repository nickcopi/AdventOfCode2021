const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);
const crabs = data[0].split(',').map(n=>Number(n));
//const crabs = [16,1,2,0,4,2,7,1,2,14];

//const sorted = crabs.sort((a,b)=>a-b);
const avg = Math.floor(crabs.reduce((acc,cur)=>acc+cur,0)/crabs.length);
console.log(avg);


const fuelsNeededFor =alignTo=>{
	const fuels = crabs.map(x=>{
		const distance = Math.abs(x-alignTo)
		return (distance * (distance+1))/2;
	});
	return fuels;
};
const fuels = fuelsNeededFor(avg);
const total = fuels.reduce((acc,cur)=>acc+cur,0);
console.log(total);
