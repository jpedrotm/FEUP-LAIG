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

    this.lights = this.gui.addFolder('Lights');
    this.lights.open();

    this.defaultControls = [];

    this.menuSituation = this.gui.addFolder('Menu Situation');
    this.menuSituation.add(this, 'PlayerVsPlayer').name('Player vs Player');
    this.menuSituation.add(this, 'PlayerVsCPU').name('Player vs CPU');
    this.menuSituation.add(this, 'cpuVscpu').name('CPU vs CPU');
    this.menuSituation.add(this.scene.gameDifficulty, 'difficulty', Object.keys(this.scene.gameDifficultyList));

    this.gameSituation = this.gui.addFolder('Play Situation');
    this.gameSituation.add(this.scene, 'undo').name('Undo');
    this.gameSituation.add(this.scene, 'replay').name('Replay');
    this.gameSituation.add(this, 'quitGame').name('Quit');
    this.gameSituation.add(this.scene.gameEnvironment, 'environmentScene', Object.keys(this.scene.environmentList));

    this.replaySituation = this.gui.addFolder('Replay Situation');
    this.replaySituation.add(this.scene, 'stopReplay').name('Stop Replay');
    this.replaySituation.add(this.scene, 'pauseReplay').name('Pause Replay');

    return true;
};

/**
 * Function that receives the inputs of the keyboard.
 * @param {Event} event
 */
MyInterface.prototype.processKeyDown = function(event) {


	switch (event.keyCode)
	{
		case(70): //f
		this.scene.updateFreeMode();
		break;
		case(77): //M
			this.scene.switchMaterials();
			break;
    case (86): //V
      this.scene.switchView();
      break;
		case(102): //F
			this.scene.updateFreeMode();
			break;
		case(109): //m
			this.scene.switchMaterials();
			break;
		case (118)://v
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

/**
* Function responsible for the input of the button in interface for the play mode PlayerVsPlayer.
*/
MyInterface.prototype.PlayerVsPlayer = function() {
    if (!this.scene.gameMode) {
        this.scene.game = new Game(this.scene, 1);
        this.scene.gameMode = true;
    }
};

/**
* Function responsible for the input of the button in interface for the play mode PlayerVsCPU.
*/
MyInterface.prototype.PlayerVsCPU = function() {
    if (!this.scene.gameMode) {
        this.scene.game = new Game(this.scene, 2);
        this.scene.gameMode = true;
    }
};

/**
* Function responsible for the input of the button in interface for the play mode cpuVscpu.
*/
MyInterface.prototype.cpuVscpu = function() {
    if (!this.scene.gameMode) {
        this.scene.game = new Game(this.scene, 3);
        this.scene.gameMode = true;
    }
};

/**
* Function responsible for the input of the button in interface to quit the game.
*/
MyInterface.prototype.quitGame = function() {
    this.scene.quitGame();
};
