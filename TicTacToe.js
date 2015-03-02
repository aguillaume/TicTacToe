// TIC TAC TOE Battle

// The main action of the Tic Tac Toe game runs in this function
function game() {
	//TODO create a board object that holds functions like update board, and create board.
	var board = createBoard(); // init TTT board 
	var plr1 = new player("1"); // player 1 is 'X'
	var plr2 = new playerRand("2"); // player 2 is 'O'
	var isPlr1 = choseRand(); // choose start player
	var nextMove;
	var gameOver = -1;

	console.log(printBoard(board));

	for(var i = 1; i <= 9; i++) { //there are only 9 tiles.
		if(isPlr1) {
			nextMove = plr1.move(board);
		}else{
			nextMove = plr2.move(board);
		}

		if(isValidMove(nextMove, board)) {
		    //Player 1 goes
			if(isPlr1) {
				board[nextMove[0]][nextMove[1]] = "X";
				printMove();
				gameOver = isGameWon(board, "X");
				if (gameOver === 1) {
					setInnerHTMLById("ans", getInnerHTMLById("ans") + "<hr>" + printBoardHTML(board, nextMove));
					setInnerHTMLById("ans", getInnerHTMLById("ans") + "<h2>PLAYER 1 WINS THE GAME!</h2>");
					return;
				}else if (gameOver === 0) {
				    document.getElementById("ans").innerHTML += "<hr>" + printBoardHTML(board, nextMove);
                    document.getElementById("ans").innerHTML += "<h2>NO ONE WINS. ITS A TIE!</h2>";
                    document.getElementById("tie").innerHTML += "I";
                    console.log(printBoard(board));
                    return;
				}else{
				    //for good measure
				}
			//Player 2 goes
			}else{
				board[nextMove[0]][nextMove[1]] = "O";
				printMove();
				gameOver = isGameWon(board, "O");
                if (gameOver === 1) {
                	setInnerHTMLById("ans", getInnerHTMLById("ans") + "<hr>" + printBoardHTML(board, nextMove));
					setInnerHTMLById("ans", getInnerHTMLById("ans") + "<h2>PLAYER 2 WINS THE GAME!</h2>");
					return;
				}else if (gameOver === 0) {
                     setInnerHTMLById("ans", getInnerHTMLById("ans") + "<hr>" + printBoardHTML(board, nextMove));
		     setInnerHTMLById("ans", getInnerHTMLById("ans") + "<h2>NO ONE WINS. ITS A TIE!</h2>");
                     document.getElementById("tie").innerHTML += "I";
                     return;
                 }else{
                     //for good measure
                 }
			}
		}else{
			if(isPlr1){
				setInnerHTMLById("ans", getInnerHTMLById("ans") + "<hr>" + printBoardHTML(board, nextMove));
				setInnerHTMLById("ans", getInnerHTMLById("ans") + "Invalid move from Player 1<br><h2>PLAYER 2 WINS THE GAME BECAUSE OF FORFAIT</h2>");
				break;
			}else{
				setInnerHTMLById("ans", getInnerHTMLById("ans") + "<hr>" + printBoardHTML(board, nextMove));
				setInnerHTMLById("ans", getInnerHTMLById("ans") + "Invalid move from Player 2<br><h2>PLAYER 1 WINS THE GAME BECAUSE OF FORFAIT</h2>");
				break;
			}
			break;// not useful..
		}

		isPlr1 = !isPlr1;
	}
	return;

	function printMove(){
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

//Determines if there is a winner 
//+1 win, 0 tie, -1 lose
function isGameWon(board, type) {
	var loopCounter = 0;
	var rowTotal = 0;
	var columnTotal = 0;
	var diagonal1Total = 0;
	var diagonal2Total = 0;
	var WIN = 1;
	var TIE = 0;
	var NOTOVER = 1;
	var isEmpty = true;

	// counter for columns
	for (var c=0; c<3; c++){
		//counter for rows
		for (var r=0; r<3; r++){
			loopCounter++;
			// test rows
			if(board[c][r] === type){
				rowTotal++;
				if (rowTotal === 3) {
					return WIN;
				}
			}
			// test columns
			if (board[r][c] === type){
				columnTotal++;
				if (columnTotal === 3) {
					return WIN;
				}
			}
			// test diagonals
			if (r === c) {
				if (board[r][c] === type){
					diagonal1Total++;
					if (diagonal1Total === 3) {
						return WIN;
					}
				}
				if (board[c][2-c] === type){
					diagonal2Total++;
					if (diagonal2Total === 3) {
						return WIN;
					}
				}
			}
			
			if (board[c][r] === '-') {
			    isEmpty = true;
			}else{
			    isEmpty = false;
			}

			// reset column and row counters
			if (loopCounter%3 === 0) {
				columnTotal = 0;
				rowTotal = 0;
			}
		}
	}
	//check if the board is full but there are no winners
	if(isEmpty === false) {
	    return TIE;
	}
	return NOTOVER;
}


//Helper function
//sets the inner HTML of a given id to text
function setInnerHTMLById(id, text) {
	document.getElementById(id).innerHTML = text;
}

//helper function
//gets the innerHTML of a given id
function getInnerHTMLById(id) {
	return document.getElementById(id).innerHTML;
}

