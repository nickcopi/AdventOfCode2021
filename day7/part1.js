const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);
const crabs = data[0].split(',').map(n=>Number(n));

const sorted = crabs.sort((a,b)=>a-b);
console.log(sorted);
const median = (sorted.length %2)?((sorted[sorted.length/2-1] + sorted[sorted.length/2])/2):sorted[sorted.length/2];

console.log(median);
const fuels = sorted.map(x=>Math.abs(x-median));
const total = fuels.reduce((acc,cur)=>acc+cur,0);
console.log(total);
