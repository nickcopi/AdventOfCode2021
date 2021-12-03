const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean).map(a=>Number(a));


let newData = [];
for(let i = 0; i < data.length -2;i++){
	newData.push(data[i] + data[i+1] + data[i+2]);
}

let count = 0;

newData.forEach((num,i,arr)=>{
	if(arr[i] && arr[i-1] < num) count++; 
})
console.log(count);
