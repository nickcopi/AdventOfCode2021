const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const template = data.shift();

const rules = data.reduce((acc,cur)=>{
	const split = cur.split(' -> ');
	acc[split[0]] = split[1];
	return acc;
},{});




const pairs = {};
for(let i = 0; i < template.length-1;i++){
	const pair = template[i] + template[i+1];
	pairs[pair] = 1;
}

for(let i = 0; i < 40; i++){
	Object.entries(pairs).forEach(([k,v])=>{
		pairs[k]-= v;
		const newLetter = rules[k];
		const child1 = [...k][0] + newLetter;
		const child2 = newLetter + [...k][1];
		if(!pairs[child1]) pairs[child1] = 0;
		pairs[child1] += v;
		if(!pairs[child2]) pairs[child2] = 0;
		pairs[child2] += v;
	});
}
const counts = {};
Object.entries(pairs).forEach(([k,v])=>{
	const letter1 = [...k][0];
	const letter2 = [...k][1];
	if(!counts[letter1]) counts[letter1] = 0;
	counts[letter1]+=v;
	if(!counts[letter2]) counts[letter2] = 0;
	counts[letter2]+=v;
});
counts[template[0]]--;
counts[template[template.length-1]]--;
Object.entries(counts).forEach(([k,v])=>{
	counts[k] = v/2;
});
counts[template[0]]++;
counts[template[template.length-1]]++;
const counted = Object.entries(counts).sort(([ka,va],[kb,vb])=>va-vb);
//console.log(counted);
const score = counted[counted.length-1][1] - counted[0][1];
console.log(score);
