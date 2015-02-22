// TIC TAC TOE Battle


// The main action of the Tic Tac Toe game runs in this function
function game() {
	//TODO create a baord object that holds functions like updateboard, and create board.
	var board = createBoard(); // init TTT board 
	var plr1 = new player("1"); // player 1 is 'X'
	var plr2 = new playerRand("2"); // player 2 is 'O'
	var isPlr1 = choseRand(); // choose start player
	var nextMove;

	console.log(printBoard(board));

	for(var i = 1; i <= 9; i++) { //there are only 9 tiles.
		if(isPlr1) {
			nextMove = plr1.move(board);
		}else{
			nextMove = plr2.move(board);
		}

		if(isValidMove(nextMove, board)) {
			if(isPlr1) {
				board[nextMove[0]][nextMove[1]] = "X";
			}else{
				board[nextMove[0]][nextMove[1]] = "O";
			}
		}else{
			if(isPlr1){
				console.log("Invalid move from Player 1");
				console.log(printBoard(board));
				document.getElementById("ans").innerHTML += "<hr>" + printBoardHTML(board);
				document.getElementById("ans").innerHTML += "Invalid move from Player 1<br><h2>PLAYER 2 WINS THE GAME BECAUSE OF FORFAIT</h2>";
				break;
			}else{
				console.log("Invalid move from Player 2");
				console.log(printBoard(board));
				document.getElementById("ans").innerHTML += "<hr>" + printBoardHTML(board);
				document.getElementById("ans").innerHTML += "Invalid move from Player 2<br><h2>PLAYER 1 WINS THE GAME BECAUSE OF FORFAIT</h2>";
				break;
			}
			break;// not useful..
		}

		if(isPlr1) {
			if(isWinner(board)) {
				document.getElementById("ans").innerHTML += "<hr>" + printBoardHTML(board, nextMove);
				document.getElementById("ans").innerHTML += "<h2>PLAYER 1 WINS THE GAME!</h2>";
				document.getElementById("plr1").innerHTML += "I";
				console.log(printBoard(board));
				break;
			}
		}else{
			if(isWinner(board)) {
				document.getElementById("ans").innerHTML += "<hr>" + printBoardHTML(board, nextMove);
				document.getElementById("ans").innerHTML += "<h2>PLAYER 2 WINS THE GAME!</h2>";
				document.getElementById("plr2").innerHTML += "I";
				console.log(printBoard(board));
				break;
			}
		}

		isPlr1 = !isPlr1;
		console.log(printBoard(board));
		document.getElementById("ans").innerHTML += "<hr>" + printBoardHTML(board);
	}


}

function game10() {
	for(var i = 0; i < 10; i++) {
		game();
	}
}


// created the empty Tic Tac Toe board
function createBoard() {
	return [["-","-","-"], ["-","-","-"], ["-","-","-"]];
}

// Finds the 1st available space and plays 
function player(plr) {
	this.playerNum = plr;

	this.move = function(b) {
		for(var i = 0; i < b.length; i++) {
			for(var j = 0; j < b[i].length; j++) {
				if(b[i][j] !== "-") {
					continue;
				} else {
					return [i, j];
				}
			}
		}
	};
}

// Randomly finds an empty space and plays there
function playerRand(plr) {
	this.playerNum = plr;

	this.move = function findMove(b) {
		var c = rand();
        var r = rand();
		if (b[c][r] !== "-") {
			return findMove(b);
		} else {
			return [c, r];
		}
	}
	
	function rand() {
		return Math.floor((Math.random()*3));
	}
}

// gives a 50-50 change for a player to start 1st
function choseRand() {
	var x = Math.random();

	if(x >= 0.5) {
		return true; 
	}else{
		return false;
	}
}

//determines whether the move is valid. If the space is empty.
function isValidMove(move, board) {
	if(board[move[0]][move[1]] === "-") {
		return true;
	}else{
		return false;
	}
}

//Determines if there is a winner
function isWinner(board) {
	var b = board; // for clarity
	//check diagonal
	if(b[0][0] != "-" && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
		return true;
	//check diagonal	
	}else if(b[0][2] != "-" && b[0][2] === b[1][1] && b[1][1] === b[2][0]){
		return true;
	}else{
		for(var i = 0; i < 3; i++) {
			//check all horizontal 
			if(b[i][0] != "-" && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
				return true;
			//check all verticals
			}else if(b[0][i] != "-" && b[0][i] === b[1][i] && b[1][i] === b[2][i]){
				return true;
			}else{
				continue;
			}
		}
		return false;
	}
}
 
// changes an empty space to the most recent move.
function updateBoard(board,nextMove, isPlr1) {
	if(isPlr1) {
		board[nextMove[0]][nextMove[1]] = "X";
	}else{
		board[nextMove[0]][nextMove[1]] = "O";
	}
}


/*
Prints the board is the shape below if a string format. For testing.
 - | - | - 
---+---+---
 - | - | - 
---+---+---
 - | - | - 

*/

function printBoard(b) {
	var text = "";
	var col = "\n---+---+---\n";
	var row = " |";
	for(var c = 0; c < b.length; c++) {
		for(var r = 0; r < b[c].length; r++) {
			if(r < 2) {
				text += " " + b[c][r] + row;
			}else{
				text += " " + b[c][r];
			}
		}
		if(c < 2) text += col;
	}
	return text;
}

//Prints the board for visualization on the HTML page
function printBoardHTML(b) {
	var text = "";
	var col = "<br>---+---+---<br>";
	var row = "&nbsp|";
	for(var c = 0; c < b.length; c++) {
		for(var r = 0; r < b[c].length; r++) {
			if(r < 2) {
				text += "&nbsp" + b[c][r] + row;
			}else{
				text += "&nbsp" + b[c][r];
			}
		}
		if(c < 2) text += col;
	}
	return text;
}

