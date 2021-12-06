const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const fish = data[0].split(',').map(n=>Number(n));
const numDays = 256;
//const fish = [3,4,3,1,2]

const fishLookup = {

}

const countFish = (fish,days)=>{
	if(days - fish < 0) return 1;
	let mainFish = fishLookup[`7,${days-fish}`];
	let newFish =fishLookup[`9,${days-fish}`];
	if(!mainFish){
		mainFish = countFish(7,days-fish);
		fishLookup[`7,${days-fish}`] = mainFish
	}
	if(!newFish){
		newFish = countFish(9,days-fish);
		fishLookup[`9,${days-fish}`] = newFish
	}
	return mainFish + newFish;
}

console.log(fish.reduce((acc,cur)=>acc+countFish(cur+1,numDays),0))
