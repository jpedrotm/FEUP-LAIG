function Game(scene){

  this.gameBoard = new Board(scene,8,4);
  this.gameHistory = new GameHistory(scene);

  this.playing = 'player1'; //Para saber que jogador faz a jogada
  this.firstBot = true;
  this.secondBot = true;
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

}

Game.prototype.initGame = function(bot1, bot2){
  this.firstBot=bot1;
  this.secodBot=bot2;
};

Game.prototype.movePiece=function(bot,xi,yi,xf,yf){

  if(this.readyToMakeAMove){
    var validMove = this.gameBoard.movePiece(this.currentValidMoves,this.playing,bot,xi,yi,xf,yf);
    console.log(validMove);
    if(validMove){
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
  this.gameBoard.display();
};

Game.prototype.update = function(currTime){

  this.gameBoard.update(currTime-this.lastTime);

  if(this.firstBot == false && this.secondBot == false){
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
    //retira comentario para animar a camera
    //this.switchTurn=true;
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
