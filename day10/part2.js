const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const stacks = [];
for(let i = 0; i < data.length;i++)
	stacks.push([]);
const closeTokens = {
	'}':'{',
	']':'[',
	')':'(',
	'>':'<'
}
//const openTokens = Object.fromEntries(Object.entries(closeTokens).map(a=>a.reverse()));
const tokenValues = {
	'(':1,
	'[':2,
	'{':3,
	'<':4,
}
const incomplete = data.filter((line,n)=>{
	for(let i = 0; i < line.length;i++){
		const token = line[i];
		if(['{','[','(','<'].includes(token))
			stacks[n].push(token);
		else {
			const result = stacks[n].pop();
			if(result !== closeTokens[token]){
				stacks[n] = null;
				return false;
			}
		}
	}
	return true;
});
const incompleteStacks = stacks.filter(stack=>stack && stack.length);
const pointsList = incompleteStacks.map(stack=>stack.reverse().map(a=>tokenValues[a]))
const scores = pointsList.map(list=>list.reduce((acc,cur)=>acc*5+cur,0));
const middleScore = scores.sort((a,b)=>a-b)[Math.floor(scores.length/2)];
console.log(middleScore);

