const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const segmentSizes = {
	1:2,
	4:4,
	7:3,
	8:7
}

const segments=data.map(line=>{
	const [inputs,outputs] = line.split(' | ').map(half=>half.split(' '))
	return {inputs,outputs};
});
console.log(segments);
const count = segments.reduce((acc,cur)=>{
	const count = cur.outputs.reduce((a,c)=>{
		//console.log(c,c.length);
		if(Object.values(segmentSizes).includes(c.length))
			return a+1;
		return a;
	},0);
	return acc+count;
},0);
console.log(count);
