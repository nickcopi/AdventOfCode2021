const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);
const segments=data.map(line=>{
	const [inputs,outputs] = line.split(' | ').map(half=>half.split(' '))
	return {inputs,outputs};
});

const numbers = segments.map(segment=>{
	const deduced = [];
	deduced[1] = segment.inputs.find(input=>input.length === 2);
	deduced[4] = segment.inputs.find(input=>input.length === 4);
	deduced[7]  = segment.inputs.find(input=>input.length === 3);
	deduced[8]  = segment.inputs.find(input=>input.length === 7);

	const twoThreeFive = segment.inputs.filter(input=>input.length === 5);
	deduced[3] = twoThreeFive.find(input=>input.includes(deduced[1][0]) && input.includes(deduced[1][1]));
	const twoFive = twoThreeFive.filter(input=>input!=deduced[3]);
	//const realA = deduced[7].split('').filter(c=>!(deduced[1].includes(c)))[0]
	const fourArm = deduced[4].split('').filter(c=>!(deduced[1].includes(c)));
	deduced[5] = twoFive.find(input=>input.includes(fourArm[0]) && input.includes(fourArm[1]));
	deduced[2] = twoFive.find(input=> input!== deduced[5]);


	const zeroSixNine = segment.inputs.filter(input=>input.length === 6);
	deduced[0] = zeroSixNine.find(input=>!(input.includes(fourArm[0]) && input.includes(fourArm[1])));
	const sixNine = zeroSixNine.filter(input=>input!==deduced[0]);
	deduced[9] = sixNine.find(input=>input.includes(deduced[1][0]) && input.includes(deduced[1][1]));
	deduced[6] = sixNine.find(input=>input !== deduced[9]);
	const lookupEntries = (new Array(deduced.length)).fill(0).map(a=>[]);
	Object.values(deduced).forEach((value,i)=>lookupEntries[i].push(value.split('').sort().join('')));
	Object.keys(deduced).forEach((value,i)=>lookupEntries[i].push(value));
	const lookup = Object.fromEntries(lookupEntries)
	//console.log(lookup);
	const decoded = segment.outputs.map(output=>{
		return lookup[output.split('').sort().join('')];
	}).join('');
	return Number(decoded);
});
const sum = numbers.reduce((acc,cur)=>acc+cur,0);
console.log(sum);
