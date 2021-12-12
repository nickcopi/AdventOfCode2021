const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().split('\n').filter(Boolean);

const edges = [];
data.forEach(line=>{
	const split = line.split('-');
	/*edges.push({
		from:split[1],
		to:split[0]
	});*/
	/*edges.push({
		from:split[0],
		to:split[1]
	});*/
	edges.push([split[0],split[1]]);
	edges.push([split[1],split[0]]);
});
console.log(edges);

const paths = edges.filter(edge=>edge[0] === 'start');
//while(1){
//}

const finishedPaths = [];

const findPaths = paths =>{
	if(!paths.length) return;
	const newPaths = [];
	paths.forEach(path=>{
		const next = edges.filter(edge=>edge[0] === path[path.length-1]).map(e=>e[1]);
		//console.log(next);

		next.forEach(n=>{
			const twoCaves = Object.values(path.reduce((acc,cur)=>{
			    if(cur !== cur.toLowerCase()) return acc;
			    if(!acc[cur]) acc[cur] = 0;
			    acc[cur]++
			    return acc;
			},{})).sort((a,b)=>b-a)[0] >1 ;
			if(n.toLowerCase() === n && n !== 'end'){
				if(n === 'start') return;
				if(twoCaves && path.includes(n)) return;
			}
			if(n === 'end')
				finishedPaths.push([...path,n]);
			else 
				newPaths.push([...path,n]);
		});
	});
	return findPaths(newPaths);
}
findPaths(paths);
console.log(finishedPaths.length);

