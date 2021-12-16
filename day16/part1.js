const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const bits = [...data[0]].map(nibble=>[...parseInt(nibble,16).toString(2).padStart(4,'0')].map(Number)).flat();

//console.log(bits.join(''));

const LITERAL_TYPE = 4;

class Packet{
	constructor(version,type,literal){
		this.version = version;
		this.type = type;
		this.literal = literal;
	}
}

const packets = [];

const readPackets = (bits,start)=>{
	const version = parseInt(bits.slice(start,start+3).join(''),2);
	const type = parseInt(bits.slice(start+3,start+6).join(''),2)
	let literalValue = null;
	let i = start+6;
	if(type === LITERAL_TYPE){
		let done = false;
		let literals = [];
		while(!done){
			const literal = bits.slice(i,i+5);
			if(!literal.shift()){
				done = true;	
			}
			literals = literals.concat(literal);
			i += 5;
		}
		literalValue = parseInt(literals.join(''),2);
	} else {
		const mode = bits[start+6];	
		i++;
		if(mode){
			const numPackets = parseInt(bits.slice(start+7,start+7+11).join(''),2);
			i+=11;
			for(let j = 0; j < numPackets;j++){
				i = readPackets(bits,i);
			}
		} else {
			const length = parseInt(bits.slice(start+7,start+7+15).join(''),2);
			i+=15;
			let targetLength = i + length -5;
			while (i < targetLength){
				i = readPackets(bits,i);
			}

		}
	}
	packets.push(new Packet(version,type,literalValue));
	return i;
}
readPackets(bits,0);
console.log(packets);
const sum = packets.reduce((acc,cur)=>acc+cur.version,0);
console.log(sum);
