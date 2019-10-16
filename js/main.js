var humanP = 'X'
var computerP = 'O'

var cells = [$('#1'), $('#2'), $('#3'), $('#4'), $('#5'), $('#6'), $('#7'), $('#8'), $('#9')],
	moveCount = 0          //9 moves means game over
	turn = 0,             //0 is human. 1 is computer.
    nonCornerNonCenterSpaces = [1,3,5,7],
    winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

   $('.col').on('click',function(){
       if (($(this).text() !== humanP) && ($(this).text() !== computerP)){
           
        if ((moveCount < 10) && (turn == 0)){
            
            $(this).text(humanP);
            moveCount++;
            turn = 1;
        }

        if ((moveCount < 10) && (turn == 1)){
            computerMove();
            moveCount++;
            turn = 0;
        }

    }else {
        alert('Click on something else.');
    }

    alertCheckWin();
    
})

function computerMove(){

    var board = getBoard(),
    moveHere = null,
    playerWinCount = 0,
    computerWinCount = 0; 
//loop through the winConditions array
        //loop through winConditions multidimensional array
        for (i = 0; i < winConditions.length; i++) { 
            //loop through the inner winning array combination
            for (j = 0; j < winConditions[i].length; j++) { 
      
            if (board[winConditions[i][j]] == 1){
                playerWinCount++;
            }else if(board[winConditions[i][j]] == 2){
                computerWinCount++;
            }
      
              //if the player is 1
              //if the computer is 2
            if (computerWinCount == 2){
                moveHere = findZero(winConditions[i], board);
                if (moveHere !== false){
                    computerMoveHere(moveHere);
                    return true; //stop the loop because we moved already
                }
            }else if(playerWinCount == 2){
      
                moveHere = findZero(winConditions[i], board);
      
                if (moveHere !== false){
                    computerMoveHere(moveHere);
                    return true; //stop the loop because we moved already
                }
            }
            }
      
            //reset these values for the next inner winning array combination
            playerWinCount = 0;
            computerWinCount = 0;
          }
      
         
//if we get here then the computer hasn't moved yet
 //because none of the winning combinations are in jeopardy of being filled
        // if the 6th and and 8th spots are taken by the player while the last spot isn't - then take the last spot
   
          var moveHere = findZero(nonCornerNonCenterSpaces, board);
      
          if ((board[5] == 1) && (board[7] == 1) && (board[8] == 0))
              computerMoveHere(8);
          else if ((board[0] == 1) && (board[8] == 1) && (moveHere !== false)){
              computerMoveHere(moveHere);
          }else if ((board[2] == 1) && (board[6] == 1) && (moveHere !== false)){
              computerMoveHere(moveHere);
          }else if ((board[5] == 1) && (board[6] == 1) && (moveCount == 3) && (moveHere !== false)){
              computerMoveHere(8);
              return true; //stop the loop because we moved already
          }else if (board[4] == 0){
              computerMoveHere(4);
              return true; //stop the loop because we moved already
          }else if(board[0] == 0){
              computerMoveHere(0);
              return true; //stop the loop because we moved already
          }else if(board[2] == 0){ 
              computerMoveHere(2);
              return true; //stop the loop because we moved already
          }else if(board[6] == 0){ 
              computerMoveHere(6);
              return true; //stop the loop because we moved already
          }else if(board[8] == 0){ 
              computerMoveHere(8);
              return true; //stop the loop because we moved already
          }else{ //other wise move to the first empty spot
              computerMoveHere(board.indexOf(0));
              return true; //stop the loop because we moved already
          }
          
      }


         
        //if a set of diagonal corners are taken by player - 
       // if so - then take a non-corner/non-center space to prevent players' tricks
      //if that's not the case then move to the middle of the board to prevent a tricky player
     //if center is taken then go for the first corner position
    //if corners are taken then go for the first empty square
      
      function computerMoveHere(num){
          //in case the below line tries to move to -1 (which doesn't exist in the array)
              //computerMoveHere(board.indexOf(0)) 
          if (num > -1) {
              cells[num].text(computerP);
          }else{
              //this means we're at a draw
              alertCheckWin();
          }
      }
      
      // alerts user of a win/draw
      function alertCheckWin(){
          var check = checkWin();
          if (check == "player"){
              // alert("You win!");
              Swal.fire(
                  'You win!'
                )
              resetBoard();
          }else if (check == "computer"){
              // alert("Computer wins.");
              Swal.fire(
                  'Computer wins.'
                )
              resetBoard();
          }else if (check == "draw"){
              // alert("DRAW");
              Swal.fire(
                  'It is A Draw'
                )
              resetBoard();
          }
      }
      
      function checkWin(){
          var board = getBoard(),
              playerWin = false,
              playerWinCount = 0,
              computerWin = false,
              computerWinCount = 0;
      
          //loop through winningCombinations multidimensional array
          for (i = 0; i < winConditions.length; i++) { 
            //loop through the inner winning array combination
            for (j = 0; j < winConditions[i].length; j++) { 
                
                //increment the appropriate counter 
                    //1 is player
                    //2 is computer
            if (board[winConditions[i][j]] == 1){
                playerWinCount++;
            }else if(board[winConditions[i][j]] == 2){
                computerWinCount++;
            }
      
            }
      
            if (computerWinCount == 3){
                return "computer"
            }else if(playerWinCount == 3){
                return "player"
            }
      
            playerWin = false;
            playerWinCount = 0;
            computerWin = false;
            computerWinCount = 0;
          }
      
          if ( 
              (playerWin == false) && 
              (computerWin == false) && 
              (moveCount == 10) 
              ){
              return "draw"
          }
      }
      
      //function returns the first empty square on the board based on the combination given 
      //OR returns false if there are no empty positions in that combination

      function findZero(combo, board){
          for (k = 0; k < combo.length; k++) { 
              if (board[combo[k]] == 0){
                  return combo[k]
              }
          }	
      
          //if no spaces are empty
          return false;
      }
      
      function getBoard(){
          var boardArray = [];
      
          for (i = 0; i < cells.length; i++) { 
              boardArray.push(letterToNumber(cells[i].text()));
          }
      
          return boardArray;
      }
      
      function letterToNumber(letter){
          if (letter == computerP){
              return 2;
          }
          else if(letter == humanP){
              return 1;
          }else{
              return 0;
          }
      }
      
      function resetBoard(){
          for (i = 0; i < cells.length; i++) { 
              cells[i].text('');
          }
          moveCount = 0;
          turn = 0;
      }
