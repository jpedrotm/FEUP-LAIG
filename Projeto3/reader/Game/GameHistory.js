/**
 * GameHistory constructor.
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

/**
* Get the moves made in the current turn.
* @param {number} turn
*/
GameHistory.prototype.getMoves=function(turn){

  for(var i=0;i<this.numberTurns;i++)
  {
    console.log("INDICE: "+i);
    console.log("MOVES INITIAL: "+this.movesMade[i].initial.x+","+this.movesMade[i].initial.y);
    console.log("MOVES FINAL: "+this.movesMade[i].final.x+","+this.movesMade[i].final.y);
  }

  return this.movesMade[turn];
};

/**
* Get the points of both players in the current turn.
* @param {number} turn
*/
GameHistory.prototype.getPointsPlayers=function(turn){
  return this.pointsPlayers[turn];
};

/**
* Get the board of the current turn.
* @param {number} turn
*/
GameHistory.prototype.getBoard=function(turn){
  return this.boards[turn];
};

/**
* Get the player of the current turn.
* @param {number} turn
*/
GameHistory.prototype.getPlayerTurn=function(turn){
  return this.playerTurns[turn];
};

/**
* Get the moves made in the last turn of the game history.
*/
GameHistory.prototype.getLastMoves=function(){
  if(this.numberTurns>0)
  {
    return this.movesMade[this.numberTurns-1];
  }
};

/**
* Get the points of the players in the last turn of the game history.
*/
GameHistory.prototype.getLastPointsPlayers=function(){
  if(this.numberTurns>0)
  {
    return this.pointsPlayers[this.numberTurns-1];
  }
};

/**
* Get the board in the last turn of the game history.
*/
GameHistory.prototype.getLastBoard=function(){

  if(this.numberTurns>0)
  {
    return this.boards[this.numberTurns-1];
  }

};

/**
* Get theplayer in the last turn of the game history.
*/
GameHistory.prototype.getLastPlayerTurn=function(){

  if(this.numberTurns>0)
  {
    return this.playerTurns[this.numberTurns-1];
  }

};

/**
* Delete the last turn saved.
*/
GameHistory.prototype.deleteLastTurn=function(){

  this.numberTurns--;
  this.pointsPlayers.pop();
  this.playerTurns.pop();
  this.movesMade.pop();
  this.boards.pop();

};
