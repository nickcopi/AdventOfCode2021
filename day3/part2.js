
const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);



const getBitCriteria = data =>{
	const onesCount = (new Array(data[0].length)).fill(0);

	data.forEach(line=>{
		[...line].forEach((bit,i)=>{
			if(bit === '1') onesCount[i]++;
		});
	});

	const gamma = onesCount.map(count=>(count < data.length/2)?0:1).join('');
	return gamma;
}
//const epsilon = onesCount.map(count=>(count < data.length/2)?1:0).join('');

//console.log(data.filter(a=>a===gamma));

let oxygenCandidates = data;
let i = 0;
while(oxygenCandidates.length > 1){
	oxygenCandidates = oxygenCandidates.filter(candidate=>{
		return candidate[i] === getBitCriteria(oxygenCandidates)[i];
	});
	i++;
}
let co2Candidates = data;
i = 0;
while(co2Candidates.length > 1){
	co2Candidates = co2Candidates.filter(candidate=>{
		return candidate[i] !== getBitCriteria(co2Candidates)[i];
	});
	i++;
}
console.log(oxygenCandidates,co2Candidates);

const lifeSupport = parseInt(oxygenCandidates.pop(),2) * parseInt(co2Candidates.pop(),2);
console.log(lifeSupport);

