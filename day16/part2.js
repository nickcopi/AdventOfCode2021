const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const bits = [...data[0]].map(nibble=>[...parseInt(nibble,16).toString(2).padStart(4,'0')].map(Number)).flat();

//console.log(bits.join(''));

const LITERAL_TYPE = 4;

class Packet{
	constructor(version,type,literal,children){
		this.version = version;
		this.type = type;
		this.literal = literal;
		this.children = children;
	}
}

const doSum = values=> values.reduce((acc,cur)=>acc+cur,0);

const doProduct = values=>values.reduce((acc,cur)=>acc*cur,1);

const doMin = values=>Math.min(...values);

const doMax = values=>Math.max(...values);

const doGt = value=>Number(value[0]>value[1]);

const doLt = value=>Number(value[0]<value[1]);

const doEq = value=>Number(value[0]===value[1]);

const functions = [
	doSum,
	doProduct,
	doMin,
	doMax,
	null,
	doGt,
	doLt,
	doEq
]

const packets = [];
let primePacket;

const readPackets = (bits,start,isFirst)=>{
	const version = parseInt(bits.slice(start,start+3).join(''),2);
	const type = parseInt(bits.slice(start+3,start+6).join(''),2)
	let literalValue = null;
	let i = start+6;
	let children = [];
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
		let newPacket;
		if(mode){
			const numPackets = parseInt(bits.slice(start+7,start+7+11).join(''),2);
			i+=11;
			for(let j = 0; j < numPackets;j++){
				[i,newPacket] = readPackets(bits,i);
				children.push(newPacket);
			}
		} else {
			const length = parseInt(bits.slice(start+7,start+7+15).join(''),2);
			i+=15;
			let targetLength = i + length -5;
			while (i < targetLength){
				[i, newPacket] = readPackets(bits,i);
				children.push(newPacket);
			}

		}
	}
	if(isFirst) primePacket = new Packet(version,type,literalValue,children);
	return [i, new Packet(version,type,literalValue,children)];
}
readPackets(bits,0,true);
console.log(primePacket);

const getPacketValue = packet=>{
	if(packet.type === LITERAL_TYPE) return packet.literal;
	const func = functions[packet.type];
	const values = packet.children.map(child=>getPacketValue(child));
	return func(values);
}

const output = getPacketValue(primePacket);
console.log(output);
