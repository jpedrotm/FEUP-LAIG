/**
 * GameHistory class
 * @param {CGFscene} scene
 * @param {int} height
 * @param {int} width
 */
function GameHistory(scene,height,width) {

  this.scene=scene;

  this.height=height;
  this.width=width;
  this.numberTurns=0;
  this.pointsPlayers=[];
  this.playerTurns=[];
	this.movesMade = []; //movesMade todos os movimentos que foram realizados (validos)
  this.boards=[]; //Apenas tens os board quando alterados

};


GameHistory.prototype.getMoves=function(turn){

  for(var i=0;i<this.numberTurns;i++)
  {
    console.log("INDICE: "+i);
    console.log("MOVES INITIAL: "+this.movesMade[i].initial.x+","+this.movesMade[i].initial.y);
    console.log("MOVES FINAL: "+this.movesMade[i].final.x+","+this.movesMade[i].final.y);
  }

  return this.movesMade[turn];
};

GameHistory.prototype.getPointsPlayers=function(turn){
  return this.pointsPlayers[turn];
};

GameHistory.prototype.getBoard=function(turn){
  return this.boards[turn];
};

GameHistory.prototype.getPlayerTurn=function(turn){
  return this.playerTurns[turn];
};

GameHistory.prototype.getLastMoves=function(){
  if(this.numberTurns>0)
  {
    return this.movesMade[this.numberTurns-1];
  }
};

GameHistory.prototype.getLastPointsPlayers=function(){
  if(this.numberTurns>0)
  {
    return this.pointsPlayers[this.numberTurns-1];
  }
};

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
