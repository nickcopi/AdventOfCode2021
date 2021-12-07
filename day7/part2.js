const fs = require('fs');
const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);
const crabs = data[0].split(',').map(n=>Number(n));
const avg = Math.floor(crabs.reduce((acc,cur)=>acc+cur,0)/crabs.length);
const fuelsNeededFor = alignTo=>crabs.map(x=>{
	const distance = Math.abs(x-alignTo)
	return (distance * (distance+1))/2;
});
const fuels = fuelsNeededFor(avg);
const total = fuels.reduce((acc,cur)=>acc+cur,0);
console.log(total);
