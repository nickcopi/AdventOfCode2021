const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const sub = {
	x:0,
	y:0,
	aim:0
}
const actions = {};
actions['forward'] = (sub,value)=>{
	sub.x += value;
	sub.y += sub.aim * value;
}
actions['down'] = (sub,value)=>sub.aim += value;
actions['up'] = (sub,value)=>sub.aim -= value;
data.forEach(instr=>{
	const split = instr.split(' ');
	actions[split[0]](sub,Number(split[1]));
});
console.log(sub);
console.log(sub.x*sub.y);
