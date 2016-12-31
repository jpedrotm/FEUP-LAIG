/**
 * Game class
 * @param {CGFscene} scene
 * @param {int} mode defines game mode, player vs player, player vs bot, bot vs bot
 */
function Game(scene,mode){

  this.scene=scene;

  this.scene.makeTransition();

  this.mode=mode;

  if(this.mode===2)
  {
    this.scene.makingTransition=true;
  }

  this.gameBoard = new Board(scene,8,4);
  this.gameHistory = new GameHistory(scene,8,4);
  this.counterOne = new Counter(scene);
  this.counterTwo = new Counter(scene);
  this.counterTime=new Timer(scene);

  this.playing = 'player1'; //Para saber que jogador faz a jogada
  this.difficulty=this.scene.gameDifficultyList[this.scene.gameDifficulty.difficulty];

  switch (mode) {
    case 1:
    this.firstBot = false;
    this.secondBot = false;
      break;
    case 2:
    this.firstBot = false;
    this.secondBot = true;
      break;
    case 3:
    this.firstBot=true;
    this.secondBot=true;
      break;
    default:
    return;
  }
  this.firstPlayerPoints=0;
  this.secondPlayerPoints=0;
  this.readyToMakeAMove=0;
  this.currentValidMoves=[];
  this.bot1played=0;
  this.bot2played=0;
  this.firstCell=new Point2D(-1,-1);
  this.secondCell=new Point2D(-1,-1);
  this.switchTurn = false;
  this.initialCurr=0;
  this.currBotTime=0;
};

/**
 * Inits game bots
 * @param  {boolean} bot1
 * @param  {boolean} bot2
 */
Game.prototype.initGame = function(bot1, bot2){
  this.firstBot=bot1;
  this.secodBot=bot2;
};

/**
 * moves piece to given coordinates
 * @param  {string} bot indentifies if player is a bot
 * @param  {int} xi
 * @param  {int} yi
 * @param  {int} xf
 * @param  {int} yf
 */
Game.prototype.movePiece=function(bot,xi,yi,xf,yf){

  if(this.readyToMakeAMove){
    var validMove = this.gameBoard.movePiece(this.currentValidMoves,this.playing,bot,xi,yi,xf,yf);
    console.log(validMove);
    if(validMove > -1){

      this.insertTurnGameHistory();

      this.firstPlayerPoints=this.gameBoard.playerOnePoints;
      this.secondPlayerPoints=this.gameBoard.playerTwoPoints;


        if(this.playing==='player2')
        {
          this.counterTwo.add(validMove);
          console.log("player changed");
          this.playing='player1';
        }
        else if(this.playing==='player1')
        {
          this.counterOne.add(validMove);
          console.log("player changed");
          this.playing='player2';
        }


      this.gameBoard.move='notAMove';

    }
    this.readyToMakeAMove=0;
  }

};

/**
 * Displays game board, timer and scores
 */
Game.prototype.display = function(){

  this.gameBoard.display();
  this.scene.pushMatrix();
  this.scene.scale(0.7,0.7,0.7);
  this.scene.translate(-10,3,8);
  this.scene.rotate(Math.PI/2,0,1,0);
  this.counterOne.display();
    this.scene.translate(14,0,0);
  this.counterTwo.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.rotate(Math.PI/2,0,1,0);
  this.scene.translate(1,6,-7);
  this.counterTime.display();
  this.scene.popMatrix();

};

/**
 * Controls player transitions
 */
Game.prototype.controlTransitions=function(){
  if(this.mode===1){
    return true;
  }
  else if(this.mode===2){
    if(this.playing==='player1')
    {
      this.scene.makingTransition=true;
      return true;
    }
    else if(this.playing==='player2')
    {
      if(this.scene.makingTransition===true)
      {
        console.log("RETURNING FALSE");
        return false;
      }
      else{
        this.scene.makingTransition=true;
        console.log("VAI FAZER MOVIMENTO");

        return true;
      }
    }
  }
  else if(this.mode===3){ //mode 3 é o modo cpu vs cpu
  if(this.scene.makingTransition===true)
  {
    return false;
  }
  else{
    this.scene.makingTransition=true;
    console.log("VAI FAZER MOVIMENTO");

    return true;
  }
}

};

/**
 * Updates Game
 * @param  {int} currTime elapsed time in miliseconds
 */
Game.prototype.update = function(currTime){

  this.verifyEndGame();
  this.initialCurr+=currTime;

  if(this.initialCurr > 1000){
    this.counterTime.increase();
    this.initialCurr=0;
  }


  this.gameBoard.update(currTime);

  var canPlay=this.controlTransitions();

  console.log("MAKING TRANSITION: "+this.scene.makingTransition);
  console.log("CAN PLAY: "+canPlay);
  console.log("MODE: "+this.mode);
  console.log("PLAYER: "+this.playing);

  if(canPlay){
    console.log("PLAY");
    if(this.endGame === 0){
      if(this.firstBot === false && this.secondBot === false){
        this.playPlayer();
      }else if(this.firstBot === false && this.secondBot === true){
        if(this.playing == 'player1'){
          this.playPlayer();
        }else{
          if(!this.bot1played)
            this.playBot();
        }
      }else{
        if(this.firstBot === true){
          this.playBot();
        }
      }
    }
  }

};

/**
 * makes a player move and asks prolog for valid moves
 */
Game.prototype.playPlayer = function() {
  this.readyToMakeAMove=0;
  var selectedCell = this.gameBoard.verifyMovementBoard(this.playing);
  if(selectedCell == 1){
    console.log(this.playing);


    var tempBoard = this.gameBoard.getBoard();
    var request = 'validMoves([' + tempBoard + '],' + this.gameBoard.board[this.gameBoard.currY][this.gameBoard.currX].type + ',' + this.gameBoard.currX + ',' + this.gameBoard.currY + ',' + this.playing + ')';
    getPrologRequest(request, this.updateValidMoves.bind(this));

  }else if(selectedCell == 2){
    this.readyToMakeAMove=1;
    this.movePiece('player',0,0,0,0);
    this.bot1played=0;
  }
};

/**
 * makes a bot play and sends a request to prolog for the move
 */
Game.prototype.playBot = function(){
  if(this.firstBot ===false && this.secondBot === true){
    this.bot1played=1;
  }
  this.readyToMakeAMove=0;
  var tempBoard = this.gameBoard.getBoard();
  var request = 'botPlay([' + tempBoard + '],' + this.playing + ',' + this.difficulty + ')';
  console.log(request);
  getPrologRequest(request, this.botMove.bind(this));
};

/**
  * receives a valid move form prolog
 */
Game.prototype.botMove = function(move){
  var botMove = JSON.parse(move.target.response);
  console.log(botMove);
  this.readyToMakeAMove=1;
  this.movePiece('bot',botMove[0],botMove[1],botMove[2],botMove[3]);
};

/**
 * Updates valid Moves
 * @param  {array} moves
 */
Game.prototype.updateValidMoves = function(moves){
  this.currentValidMoves = JSON.parse(moves.target.response);
  for(var i=0; i<this.currentValidMoves.length;i++){
    this.gameBoard.board[this.currentValidMoves[i][3]][this.currentValidMoves[i][2]].setSelected();
  }

};

/**
 * addes a turn to game history
 */
Game.prototype.insertTurnGameHistory=function(){

  this.gameHistory.numberTurns++;
  this.gameHistory.playerTurns.push(this.playing);
  this.gameHistory.pointsPlayers.push(new playersPoints(this.firstPlayerPoints,this.secondPlayerPoints));
  this.gameHistory.movesMade.push(new Moves(new Point2D(this.gameBoard.firstCell.x,this.gameBoard.firstCell.y),new Point2D(this.gameBoard.secondCell.x,this.gameBoard.secondCell.y)));
  this.gameHistory.boards.push(this.gameBoard.getCopyBoard());

  /*console.log("Players points: "+this.gameHistory.pointsPlayers[this.gameHistory.numberTurns-1].p1+" , "+this.gameHistory.pointsPlayers[this.gameHistory.numberTurns-1].p2);
  console.log("Turns made: "+this.gameHistory.numberTurns);
  console.log("Player turn: "+this.gameHistory.playerTurns[this.gameHistory.numberTurns-1]);
  console.log("Move made in turn: "+this.gameHistory.movesMade[this.gameHistory.numberTurns-1].initial.x+
              ","+this.gameHistory.movesMade[this.gameHistory.numberTurns-1].initial.y+
              ";"+this.gameHistory.movesMade[this.gameHistory.numberTurns-1].final.x+","+
              this.gameHistory.movesMade[this.gameHistory.numberTurns-1].final.y);*/

};

/**
 * adds undo functionality
 *
 */
Game.prototype.undo=function(){

  if(this.gameHistory.numberTurns>0 && !this.gameBoard.makingAMove)
  {
    //falta atualizar pontuações

    this.gameBoard.board=this.gameHistory.getLastBoard();

    for(var i=0;i<8;i++)
    {
      for(var j=0;j<4;j++)
      {
        console.log(this.gameBoard.board[i][j].type);
      }
      console.log(",");
    }

    var pointsPlayers=this.gameHistory.getLastPointsPlayers();

    this.firstPlayerPoints=pointsPlayers.p1;
    this.secondPlayerPoints=pointsPlayers.p2;
    this.playing=this.gameHistory.getLastPlayerTurn();

    console.log("UNDO---------------------------------------------------------");
    console.log("p1: "+pointsPlayers.p1);
    console.log("p2: "+pointsPlayers.p2);
    console.log("NUMBER OF TURNS: "+this.gameHistory.numberTurns);
    console.log("WILL PLAY: "+this.playing);

    this.gameHistory.deleteLastTurn();

    this.switchTurn=true;
  }

};

/**
 * Verifies end game by checking if one side of the board is empty
 */
Game.prototype.verifyEndGame = function() {
    var playerOneWon = 1;
    var playerTwoWon = 1;
    var i = 0;
    var j = 0;
    for (i = 0; i < this.gameBoard.board.length / 2; i++) {
        for (j = 0; j < this.gameBoard.board[0].length; j++) {
            if (this.gameBoard.board[i][j].type != 'empty')
                playerOneWon = 0;
        }
    }
    for (i = 4; i < this.gameBoard.board.length; i++) {
        for (j = 0; j < this.gameBoard.board[0].length; j++) {
            if (this.gameBoard.board[i][j].type != 'empty')
                playerTwoWon = 0;
        }
    }
    if (playerTwoWon) {
        this.endGame = 2;
    } else if (playerOneWon) {
        this.endGame = 1;
    } else {
        this.endGame = 0;
    }

    if (this.endGame != 0) {
        this.scene.makeTransition();

        this.scene.gameMode = false;

        this.scene.replayHistory = this.gameHistory;

        this.game = null;
    }

};
