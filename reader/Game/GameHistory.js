function GameHistory(scene) {

  this.scene=scene;

  this.movesPicked = []; //Diferença entre movesPicked e movesMade é movesPicked são todos os movimentos que tentou fazer
	this.movesMade = []; //movesMade todos os movimentos que foram realizados (validos)
	this.playing = 'player1';
	this.botPlayed = false;

};
