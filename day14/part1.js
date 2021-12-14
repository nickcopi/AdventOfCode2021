const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const template = data.shift();

const rules = data.reduce((acc,cur)=>{
	const split = cur.split(' -> ');
	acc[split[0]] = split[1];
	return acc;
},{});
//console.log(template,rules);

const calcTemplate = (template,iterations)=>{
	if(!iterations) return template;
	const newTemplate = [...template];
	for(let i = 0; i < template.length-1;i++){
		const pair = template[i] + template[i+1];
		newTemplate.splice(i+i+1,0,rules[pair]);
	}
	return calcTemplate(newTemplate.join(''),iterations-1);
}

const polymer = calcTemplate(template,10);

const elementCounts = [...polymer].reduce((acc,cur)=>{
	if(!acc[cur]) acc[cur] = 0;
	acc[cur]++;
	return acc;
},{})
const counts = Object.entries(elementCounts).sort(([ka,va],[kb,vb])=>va-vb);
console.log(elementCounts);
console.log(counts);
const score = counts[counts.length-1][1] - counts[0][1];
console.log(score);
