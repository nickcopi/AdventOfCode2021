const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const stack = [];
const closeTokens = {
	'}':'{',
	']':'[',
	')':'(',
	'>':'<'
}
const tokenValues = {
	')':3,
	']':57,
	'}':1197,
	'>':25137,
}
const badTokens = [];
data.forEach(line=>{
	for(let i = 0; i < line.length;i++){
		const token = line[i];
		if(['{','[','(','<'].includes(token))
			stack.push(token);
		else {
			const result = stack.pop();
			if(result !== closeTokens[token]){
				//console.log(token,result,i);
				badTokens.push(token);
				break;
			}
		}
	}
});
console.log(badTokens);
const score = badTokens.reduce((acc,cur)=>acc+tokenValues[cur],0);
console.log(score);
