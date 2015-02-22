// TIC TAC TOE Battle

/*
ttt board >> a 3x3 double array
player 1 & 2 code
ttt game rules
	if 3 X or O row, col or diag == X or O wins
	If all spaces taken and no winner == tie (or loop 9 times because cant play more than that)
	
	create board
	randomly choose player to start
	loop 9 times
	plr1 go 
		if valid move 
			if plr1 win
				end game plr1 wins! 
			else 
				plr 2 go (ie restart loop)
		else
			unval move, end game, plr 2 wins
*/

function game() {
	var board = createBoard(); // init TTT board
	var plr1 = new player("1");
	var plr2 = new playerRand("2");
	var isPlr1 = choseRand(); // choose start player
	var nextMove;
	var gameOver = false;

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
				printMove();
				gameOver = isGameWon(board, "X");
				if (gameOver) {
					alert("Game Over - Player 1 won!");
					return;
				}
			}else{
				board[nextMove[0]][nextMove[1]] = "O";
				printMove();
				gameOver = isGameWon(board, "O");
                if (gameOver) {
					alert("Game Over - Player 2 won!");
					return;
				}
			}
		}else{
			if(isPlr1){
				console.log("Invalid move from Player 1");
			}else{
				console.log("Invalid move from Player 2");
			}
			break;
		}

		isPlr1 = !isPlr1;
	}
	alert("Game Over - Neither player won!");
	return;

	function printMove(){
		console.log(printBoard(board));
        document.getElementById("ans").innerHTML += "<hr>" + printBoardHTML(board);
	}
}


function createBoard() {
	return [["-","-","-"], ["-","-","-"], ["-","-","-"]];
}

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
		return Math.floor(Math.random()*3);
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

function isValidMove(move, board) {
	if(board[move[0]][move[1]] === "-") {
		return true;
	}else{
		return false;
	}
}

function updateBoard(board,nextMove, isPlr1) {
	if(isPlr1) {
		board[nextMove[0]][nextMove[1]] = "X";
	}else{
		board[nextMove[0]][nextMove[1]] = "O";
	}
}

/*

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

function isGameWon(board, type) {
	var loopCounter = 0;
	var rowTotal = 0;
	var columnTotal = 0;
	var diagonal1Total = 0;
	var diagonal2Total = 0;

	// counter for columns
	for (var c=0; c<3; c++){
		//counter for rows
		for (var r=0; r<3; r++){
			loopCounter++;
			// test rows
			if(board[c][r] === type){
				rowTotal++;
				if (rowTotal === 3) {
					return true;
				}
			}
			// test columns
			if (board[r][c] === type){
				columnTotal++;
				if (columnTotal === 3) {
					return true;
				}
			}
			// test diagonals
			if (r === c) {
				if (board[r][c] === type){
					diagonal1Total++;
					if (diagonal1Total === 3) {
						return true;
					}
				}
				if (board[c][2-c] === type){
					diagonal2Total++;
					if (diagonal2Total === 3) {
						return true;
					}
				}
			}

			// reset column and row counters
			if (loopCounter%3 === 0) {
				columnTotal = 0;
				rowTotal = 0;
			}
		}
	}
	return false;
}

