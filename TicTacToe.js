// TIC TAC TOE Battle

// The main action of the Tic Tac Toe game runs in this function

var TICTACTOE = (function () {

    // created the empty Tic Tac Toe board
    var createBoard = function () {
        return [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
    };

    // Finds the 1st available space and plays
    function player(plr) {
        this.playerNum = plr;
        this.playerName = "Dumb1";

        this.move = function (b) {
            for (var i = 0; i < b.length; i++) {
                for (var j = 0; j < b[i].length; j++) {
                    if (b[i][j] !== "-") {
                        continue;
                    } else {
                        return [i, j];
                    }
                }
            }
        };
    };

    function playerRand(plr) {
        this.playerNum = plr;
        this.playerName = "Dumb Rand";

        this.move = function (b) {
            var c = randC(b);
            var r = randR(c, b);
            return [c, r];
        }

        function randC(b) {
            var mem_array = [];
            var board_size = b.length;
            for (var i = 0; i < board_size; i++) {
                if (b[i].indexOf('-') > -1) {
                    mem_array.push(i);
                }
            }
            // select randomly from mem_array
            return mem_array[Math.floor(Math.random() * mem_array.length)];
        }

        function randR(c, b) {
            var mem_array = [];
            var row_size = b[c].length;
            for (var i = 0; i < row_size; i++) {
                if (b[c][i] === "-") {
                    mem_array.push(i);
                }
            }
            // select randomly from mem_array
            return mem_array[Math.floor(Math.random() * mem_array.length)];
        }
    };

    // gives a 50-50 change for a player to start 1st
    var choseRand = function () {
        var x = Math.random();
        if (x >= 0.5) {
            return true;
        } else {
            return false;
        }
    };

    //determines whether the move is valid. If the space is empty.
    var isValidMove = function (move, board) {
        if (board[move[0]][move[1]] === "-") {
            return true;
        } else {
            return false;
        }
    };

    // changes an empty space to the most recent move.
    var updateBoard = function (board, nextMove, isPlr1) {
        if (isPlr1) {
            board[nextMove[0]][nextMove[1]] = "X";
        } else {
            board[nextMove[0]][nextMove[1]] = "O";
        }
    };


    /*
	Prints the board is the shape below if a string format. For testing.
	 - | - | -
	---+---+---
	 - | - | -
	---+---+---
	 - | - | -

	*/

    var printBoardHTML2 = function (b, isNewGame) {
//        var isNewGame = true;
        var text = "";
        var col = "<br>---+---+---<br>";
        var row = "&nbsp|";

        for (var c = 0; c < b.length; c++) {
            for (var r = 0; r < b[c].length; r++) {
                if (r < 2) {
                    text += "&nbsp" + b[c][r] + row;
                } else {
                    text += "&nbsp" + b[c][r];
                }
            }
            if (c < 2) text += col;
        }

        if (isNewGame) $("gameHolder").append("<game></game>");

        $("game").eq(-1).append("<move>" + text + "</move>");
    }

    //Determines if there is a winner
    //+1 win, 0 tie, -1 lose
    var isGameWon = function (board, type) {
        var loopCounter = 0;
        var rowTotal = 0;
        var columnTotal = 0;
        var diagonal1Total = 0;
        var diagonal2Total = 0;
        var takenSpacesTotal = 0;
        var WIN = 1;
        var TIE = 0;
        var NOTOVER = 2;


        // counter for columns
        for (var c = 0; c < 3; c++) {
            //counter for rows
            for (var r = 0; r < 3; r++) {
                loopCounter++;
                //check if the cell is already occupied
                if (board[c][r] !== '-') {
                    takenSpacesTotal++;
                }
                // test rows
                if (board[c][r] === type) {
                    rowTotal++;
                    if (rowTotal === 3) {
                        return WIN;
                    }
                }
                // test columns
                if (board[r][c] === type) {
                    columnTotal++;
                    if (columnTotal === 3) {
                        return WIN;
                    }
                }
                // test diagonals
                if (r === c) {
                    if (board[r][c] === type) {
                        diagonal1Total++;
                        if (diagonal1Total === 3) {
                            return WIN;
                        }
                    }
                    if (board[c][2 - c] === type) {
                        diagonal2Total++;
                        if (diagonal2Total === 3) {
                            return WIN;
                        }
                    }
                }

                // reset column and row counters
                if (loopCounter % 3 === 0) {
                    columnTotal = 0;
                    rowTotal = 0;
                }
            }
        }
        //check if the board is full but there are no winners
        if (takenSpacesTotal === 9) {
            return TIE;
        }

        return NOTOVER;
    };


    //Helper function
    //sets the inner HTML of a given id to text
    var setInnerHTMLById = function (id, text) {
        document.getElementById(id).innerHTML = text;
    };

    //helper function
    //gets the innerHTML of a given id
    var getInnerHTMLById = function (id) {
        return document.getElementById(id).innerHTML;
    };

    /*
    @Ruta - know that this is bad pratice, but I need to keep track of these outside of game.
    Maybe they should be in either a board function or in the player function or something. I will try and fix it later.
    @Guillaume - these are not global, they are inside TICTACTOE object scope and can not be accessed from outside, because
    you do not return them below (only game and game10 are returned). Try to access them (do something like alert(TICTACTOE.scorePlr1)
    and you will see that you get undefined back, which is not the case for game and game10.
    */

    var scorePlr1 = 0;
    var scorePlr2 = 0;
    var scoreTie = 0;

    var game = function () {
        //TODO create a board object that holds functions like update board, and create board.
        var board = createBoard(); // init TTT board
        var plr1 = new player("1"); // player 1 is 'X'
        var plr2 = new playerRand("2"); // player 2 is 'O'
        var isPlr1 = choseRand(); // choose start player
        var nextMove;
        var gameOver = -1;

        //set progress bar player name with jQuery
        $(".plr1Win player").text(plr1.playerName);
        $(".plr2Win player").text(plr2.playerName);

        //console.log(printBoard(board));

        for (var i = 1; i <= 9; i++) { //there are only 9 tiles.
            if (isPlr1) {
                nextMove = plr1.move(board);
            } else {
                nextMove = plr2.move(board);
            }

            if (isValidMove(nextMove, board)) {
                //Player 1 goes
                if (isPlr1) {
                    board[nextMove[0]][nextMove[1]] = "X";
                    printMove(i);
                    gameOver = isGameWon(board, "X");
                    if (gameOver === 1) { //plr1 wins
                        scorePlr1++;
                        updateProgessBar(plr1.playerName);
                        $("game").eq(-1).append("<h5>PLAYER 1 WINS THE GAME!</h5>");
                        return;
                    } else if (gameOver === 0) { // game ends in tie
                        scoreTie++;
                        updateProgessBar();
                        $("game").eq(-1).append("<h5>NO ONE WINS. ITS A TIE!</h5>");
                        return;
                    } else {
                        //for good measure
                    }
                    //Player 2 goes
                } else {
                    board[nextMove[0]][nextMove[1]] = "O";
                    printMove(i);
                    gameOver = isGameWon(board, "O");
                    if (gameOver === 1) { //plr2 wins
                        scorePlr2++;
                        updateProgessBar(plr2.playerName);
                        $("game").eq(-1).append("<h5>PLAYER 2 WINS THE GAME!</h5>");
                        return;
                    } else if (gameOver === 0) { //game ends in a tie
                        scoreTie++;
                        updateProgessBar();
                        $("game").eq(-1).append("<h5>NO ONE WINS. ITS A TIE!</h5>");
                        return;
                    } else {
                        //for good measure
                    }
                }
            } else {
                if (isPlr1) {
                    invalidMove(1);
                    break;
                } else {
                    invalidMove(2);
                    break;
                }
            }

            isPlr1 = !isPlr1;
        }
        return; /*What is this? @Guillaume - this stops the game (once the loop finished executing, i.e. it went through
        all nine cells, you want to stop the game - if everything goes well this return should not be reached, one of the
        the returns within the loop should execute first*/

        function printMove(moveNumber, gameOver, player) {
            //new print move with jQuery
            var isNewGame = (moveNumber == 1) ? true : false;
            $("gameHolder").append(printBoardHTML2(board, isNewGame));
        }

        //new update win counter function
        function updateProgessBar() {
            var scoreTot = scorePlr1 + scorePlr2 + scoreTie;
            var scrP1 = scorePlr1 / scoreTot * 100;
            var scrP2 = scorePlr2 / scoreTot * 100;
            var scrTie = scoreTie / scoreTot * 100;

            //jQuery hide or show if the progress bar if no value yet
            (scrP1 == 0) ? $(".plr1Win").hide(): $(".plr1Win").show();
            (scrP2 == 0) ? $(".plr2Win").hide(): $(".plr2Win").show();
            (scrTie == 0) ? $(".tie").hide(): $(".tie").show();

            //jQuery change width of progress bar on the fly.
            $(".plr1Win").css("width", "" + scrP1 + "%");
            $(".plr1Win lable").text("" + Math.floor(scrP1) + "%");

            $(".plr2Win").css("width", "" + scrP2 + "%");
            $(".plr2Win lable").text("" + Math.floor(scrP2) + "%");

            $(".tie").css("width", "" + scrTie + "%");
            $(".tie lable").text("" + Math.floor(scrTie) + "%");
        }

        function invalidMove(player) {
            $("game").eq(-1).append("<h3>Invalid move from Player " + player + "<br>OPPONENT WINS THE GAME BECAUSE OF FORFAIT</h3>");
        }
    }

    var game10 = function () {
        for (var i = 0; i < 10; i++) {
            game();
        }
    }

    //make only game and game10 public
    return {
        game: game,
        game10: game10
    };

})();
