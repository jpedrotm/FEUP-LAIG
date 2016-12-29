function GameHistory(scene) {

  this.scene=scene;

  this.numberTurns=0;
  this.pointsPlayers=[];
  this.playerTurns=[];
	this.movesMade = []; //movesMade todos os movimentos que foram realizados (validos)
  this.boards=[]; //Apenas tens os board quando alterados

};

GameHistory.prototype.getLastPointsPlayers=function(){
  if(this.numberTurns>0)
  {
    return this.pointsPlayers[this.numberTurns-1];
  }
}

GameHistory.prototype.getLastBoard=function(){

  if(this.numberTurns>0)
  {
    return this.boards[this.numberTurns-1];
  }

};

GameHistory.prototype.getLastPlayerTurn=function(){

  if(this.numberTurns>0)
  {
    return this.playerTurns[this.numberTurns-1];
  }

};


GameHistory.prototype.deleteLastTurn=function(){

  this.numberTurns--;
  this.pointsPlayers.pop();
  this.playerTurns.pop();
  this.movesMade.pop();
  this.boards.pop();

};
