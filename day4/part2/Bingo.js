
class BingoBoard{
	constructor(fields){
		this.setFields(fields);
		this.won = false;
	}
	setFields= fields=>{
		this.fields = fields.map(field=>{
			return field.map(field=>{
				return {
					value:field,
					turnPulled:-1,
				}
			});

		});
	}
	reset=()=>{
		this.fields.flat().forEach(field=>field.turnPulled = -1);
		this.won = false;
	}
	doPull(value,turn){
		const field = this.fields.flat().find(field=>field.value === value);
		if(field){
			field.turnPulled = turn;
		}
	}
	checkBoard = ()=>{
		for(let i = 0; i < this.fields.length;i++){
			const verticalFields = [this.fields[0][i],this.fields[1][i],this.fields[2][i],this.fields[3][i],this.fields[4][i]];
			if(verticalFields.every(field=>field.turnPulled > -1)){
				this.won = true;
				return {
					turn: verticalFields.sort((f1,f2)=>f2.turnPulled - f1.turnPulled)[0],
					sum: this.fields.flat().filter(field=>field.turnPulled === -1).reduce((acc,cum)=>acc+cum.value,0)
				}
			}
			const horizontalFields = [this.fields[i][0],this.fields[i][1],this.fields[i][2],this.fields[i][3],this.fields[i][4]];
			if(horizontalFields.every(field=>field.turnPulled > -1)){
				this.won = true;
				return {
					turn: horizontalFields.sort((f1,f2)=>f2.turnPulled - f1.turnPulled)[0],
					sum: this.fields.flat().filter(field=>field.turnPulled === -1).reduce((acc,cum)=>acc+cum.value,0)
				}
			}
				

		}
	}

}


module.exports = class Bingo{

	constructor(pulls,boards){
		this.pulls = pulls;
		this.boards = boards.map(fields=>{
			return new BingoBoard(fields);
		});
	}
	playGame(boards){
		if(!boards) boards = this.boards;
		for(let i = 0; i < this.pulls.length; i++){
			const pull = this.pulls[i];
			const turn = i+1;
			console.log(turn);
			let win;
			let finalBoard = boards.filter(board=>board.won).length === boards.length-2;
			console.log(finalBoard);
			boards.forEach(board=>{
				if(board.won) return;
				board.doPull(pull,turn);
				const check = board.checkBoard();
				if(check && finalBoard) win = check;
			});
			if(win) return win;
		}
	}
	getWinningBoards(){
		const winningBoards = this.boards.filter(board=>board.won);
		winningBoards.forEach(board=>board.reset());
		//console.log(winningBoards.length);
		return winningBoards;
	}
}
