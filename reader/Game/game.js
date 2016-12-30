function Game(scene,mode){

  this.scene=scene;

  this.scene.makeTransition();

  this.gameBoard = new Board(scene,8,4);
  this.gameHistory = new GameHistory(scene);

  this.playing = 'player1'; //Para saber que jogador faz a jogada
  this.difficulty=this.scene.gameDifficultyList[this.scene.gameDifficulty.difficulty];

  switch (mode) {
    case 1:
    this.firstBot = false;
    this.secondBot = false;
      break;
    case 2:
    this.firstBot = true;
    this.secondBot = false;
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
  this.botCurrentDeltaTime=0;
  this.botDeltaTime=100;
  this.endGame=0;
};

Game.prototype.initGame = function(bot1, bot2){
  this.firstBot=bot1;
  this.secodBot=bot2;
};

Game.prototype.movePiece=function(bot,xi,yi,xf,yf){

  if(this.readyToMakeAMove){
    var validMove = this.gameBoard.movePiece(this.currentValidMoves,this.playing,bot,xi,yi,xf,yf);
    console.log(validMove);
    if(validMove){

      this.insertTurnGameHistory();

      this.firstPlayerPoints=this.gameBoard.playerOnePoints;
      this.secondPlayerPoints=this.gameBoard.playerTwoPoints;

      console.log("player one points:");
      console.log(this.firstPlayerPoints);
      console.log("player two points:");
      console.log(this.secondPlayerPoints);
      if(this.firstBot === false){
        if(this.playing==='player2')
        {
          console.log("player changed");
          this.playing='player1';
        }
        else if(this.playing==='player1')
        {
          console.log("player changed");
          this.playing='player2';
        }
      }

    }
    this.readyToMakeAMove=0;
  }

};


Game.prototype.display = function(){

  /*console.log("COMEÇA");

  for(var i=0;i<8;i++)
  {
    for(var j=0;j<4;j++)
    {
      console.log(this.gameBoard.board[i][j].type);
    }
    console.log(",");
  }*/

  this.gameBoard.display();
};

Game.prototype.update = function(currTime){

  this.verifyEndGame();

  this.gameBoard.update(currTime);

  /*console.log("Player one points: "+this.firstPlayerPoints);
  console.log("Player two points: "+this.secondPlayerPoints);
  console.log("PLAYING: "+this.playing);*/
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
      if(this.firstBot === true && this.botCurrentDeltaTime > this.botDeltaTime){
        if(this.playing==='player2')
        {
          console.log("player changed");
          this.playing='player1';
        }
        else if(this.playing==='player1')
        {
          console.log("player changed");
          this.playing='player2';
        }
        this.botCurrentDeltaTime=0;
        this.playBot();
      }
      console.log(this.botCurrentDeltaTime);
      this.botCurrentDeltaTime++;

    }
  }

};

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

Game.prototype.playBot = function(){
  if(this.firstBot ===false && this.secondBot === true){
    this.bot1played=1;
  }
  this.readyToMakeAMove=0;
  var tempBoard = this.gameBoard.getBoard();
  var request = 'botPlay([' + tempBoard + '],' + this.playing + ',' + 2 + ')';
  getPrologRequest(request, this.botMove.bind(this));


};

Game.prototype.botMove = function(move){
  var botMove = JSON.parse(move.target.response);
  console.log(botMove);
  this.readyToMakeAMove=1;
  this.movePiece('bot',botMove[0],botMove[1],botMove[2],botMove[3]);
};

Game.prototype.updateValidMoves = function(moves){
  this.currentValidMoves = JSON.parse(moves.target.response);
  for(var i=0; i<this.currentValidMoves.length;i++){
    this.gameBoard.board[this.currentValidMoves[i][3]][this.currentValidMoves[i][2]].setSelected();
  }

};

Game.prototype.insertTurnGameHistory=function(){

  this.gameHistory.numberTurns++;
  this.gameHistory.playerTurns.push(this.playing);
  this.gameHistory.pointsPlayers.push(new playersPoints(this.firstPlayerPoints,this.secondPlayerPoints));
  this.gameHistory.movesMade.push(new Moves(this.gameBoard.firstCell,this.gameBoard.secondCell));
  this.gameHistory.boards.push(this.gameBoard.getCopyBoard());

  console.log("Players points: "+this.gameHistory.pointsPlayers[this.gameHistory.numberTurns-1].p1+" , "+this.gameHistory.pointsPlayers[this.gameHistory.numberTurns-1].p2);
  console.log("Turns made: "+this.gameHistory.numberTurns);
  console.log("Player turn: "+this.gameHistory.playerTurns[this.gameHistory.numberTurns-1]);
  console.log("Move made in turn: "+this.gameHistory.movesMade[this.gameHistory.numberTurns-1].initial.x+
              ","+this.gameHistory.movesMade[this.gameHistory.numberTurns-1].initial.y+
              ";"+this.gameHistory.movesMade[this.gameHistory.numberTurns-1].final.x+","+
              this.gameHistory.movesMade[this.gameHistory.numberTurns-1].final.y);

};

Game.prototype.undo=function(){

  if(this.gameHistory.numberTurns>0 && !this.gameBoard.makingAMove)
  {
    //falta atualizar pontuações

    this.gameBoard.board=this.gameHistory.getLastBoard();

    console.log("COMEÇA");

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


Game.prototype.verifyEndGame = function() {
  var playerOneWon=1;
  var playerTwoWon=1;
  var i=0;
  var j=0;
  for(i = 0; i < this.gameBoard.board.length/2; i++){
    for(j = 0; j < this.gameBoard.board[0].length; j++){
      if(this.gameBoard.board[i][j].type!='empty')
        playerOneWon=0;
    }
  }
  for(i = 4; i < this.gameBoard.board.length; i++){
    for(j = 0; j < this.gameBoard.board[0].length; j++){
      if(this.gameBoard.board[i][j].type!='empty')
        playerTwoWon=0;
    }
  }
  if(playerTwoWon){
    this.endGame = 2;
  }else if(playerOneWon){
    this.endGame = 1;
  }else{
    this.endGame = 0;
  }
};
