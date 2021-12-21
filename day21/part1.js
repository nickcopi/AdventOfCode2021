const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);


class Player{
	constructor(start){
		this.pos = start;
		this.score = 0;
	}
	move(roll){
		this.pos = 1 + ((this.pos-1 + roll) % 10)
		this.score += this.pos;
	}
}

const p1Split = data[0].split(' ')
const player1 = new Player(Number(p1Split[p1Split.length-1]));
const p2Split = data[1].split(' ')
const player2 = new Player(Number(p2Split[p2Split.length-1]));

const players = [player1,player2];

let dieState = 0;
let rolls = 0;
const rollDie = ()=>{
	rolls++;
	const roll = 1+ dieState;
	dieState = (dieState + 1) % 100;
	return roll;
}

const doRolls = ()=>{
	return rollDie() + rollDie() + rollDie();
}
let turn = 0
while(players.every(player=>player.score < 1000)){
	players[turn].move(doRolls());
	turn = (turn + 1) % players.length;
}
console.log(players, rolls);
const lowScore = players.sort((a,b)=>a.score-b.score)[0].score;
const result = lowScore * rolls;
console.log(result);
