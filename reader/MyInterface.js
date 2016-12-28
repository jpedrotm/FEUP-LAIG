/**
 * MyInterface
 * @constructor
 */
function MyInterface() {

	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * initialize the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {

	CGFinterface.prototype.init.call(this, application);

	this.gui = new dat.GUI();

	this.lights = this.gui.addFolder("Lights");
  this.lights.open();

	this.defaultControls = [];
	this.replayControls = [];

	this.defaultControls[0] = this.gui.add(this,'PlayerVsPlayer').name('Player vs Player');
	this.defaultControls[1] = this.gui.add(this,'PlayerVsCPU').name('Player vs CPU');
	this.defaultControls[2] = this.gui.add(this,'cpuVscpu').name('CPU vs CPU');
	this.defaultControls[3] = this.gui.add(this.scene,'undo').name('Undo');
	this.defaultControls[4] = this.gui.add(this,'replay').name('Replay');
	this.defaultControls[5] = this.gui.add(this,'quitGame').name('Quit');

	this.gui.add(this.scene.gameDifficulty,'difficulty',Object.keys(this.scene.gameDifficultyList));

	console.log("game difficulty: "+this.scene.gameDifficulty.difficulty);

	console.log("game difficulty list: "+ Object.keys(this.scene.gameDifficultyList));

  return true;
};

/**
* Function that receives the inputs of the keyboard.
* @param {Event} event
*/
MyInterface.prototype.processKeyDown = function(event) {


	switch (event.keyCode)
	{
		case(77):
			this.scene.switchMaterials();
			break;
    case (86):
      this.scene.switchView();
      break;
		case(109):
			this.scene.switchMaterials();
			break;
		case (118):
	    this.scene.switchView();
			break;

	};
};

/**
* Adds the lights to the interface by receiving the indice and the id of the light to be added.
* @param {number} i
* @param {number} id
*/
MyInterface.prototype.addLight = function(i, id) {

	this.lights.add(this.scene.infoLights, i, this.scene.infoLights[i]).name(id);

};

MyInterface.prototype.PlayerVsPlayer=function(){
	if(!this.scene.gameMode){
	this.scene.game=new Game(this.scene,1);
	this.scene.gameMode=true;
}
};

MyInterface.prototype.PlayerVsCPU=function(){
	if(!this.scene.gameMode){
	this.scene.game=new Game(this.scene,2);
	this.scene.gameMode=true;
	}
};

MyInterface.prototype.cpuVscpu=function(){
	if(!this.scene.gameMode){
	this.scene.game=new Game(this.scene,3);
	this.scene.gameMode=true;
	}
};

MyInterface.prototype.replay=function(){
	
};

MyInterface.prototype.quitGame=function(){
	if(this.scene.gameMode){

	}
};
