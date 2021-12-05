const fs = require('fs');
const Bingo = require('./Bingo');

const data = fs.readFileSync('input.txt').toString();


const parseData = data=>{
	const split = data.split('\n');
	const pulls = split[0].split(',').map(a=>Number(a));
	let rows = []
	for(let i = 1; i < split.length;i++){
		if(!split[i]) rows.push([]);
		else rows[rows.length-1].push(split[i].split(' ').filter(Boolean).map(a=>Number(a)))
	}
	//console.log(rows);
	return new Bingo(pulls,rows);
}
const bingo = parseData(data);
console.log(bingo.playGame());

